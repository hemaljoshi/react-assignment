import React, { useCallback, useEffect, useState } from "react";
import { addIcon, deleteIcon, downloadIcon, uploadIcon } from "../../assets";
import { useDropzone } from "react-dropzone";
import "react-dropzone/examples/theme.css";
import { XMarkIcon } from "@heroicons/react/20/solid";

const EnvironmentVariables = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [envVars, setEnvVars] = useState([]);
  const [envVarsFromLocalStorage, setEnvVarsFromLocalStorage] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: [".env"],
    maxFiles: 1,
  });

  function validateFile(file) {
    const extension = file.path.split(".").pop();
    if (extension.toLowerCase() !== "env") {
      alert("Only .env files allowed!");
      return false;
    }
    return true;
  }

  function parseEnvFile(fileContent) {
    const lines = fileContent.split(/\r?\n/);
    const newEnvVars = [];

    lines.forEach((line) => {
      const [key, value] = line.split("=");
      const trimmedKey = key?.trim();
      const trimmedValue = value?.trim();

      if (trimmedKey) {
        newEnvVars.push({ key: trimmedKey, value: trimmedValue });
      } else {
        console.warn(`Skipping invalid key: "${trimmedKey}" (not allowed)`);
      }
    });

    return newEnvVars;
  }

  function combineEnvVars(existingEnvVars, newEnvVars) {
    const combinedEnvVars = [...existingEnvVars];
    newEnvVars.forEach((newEnvVar) => {
      const existingIndex = combinedEnvVars.findIndex(
        (existingEnvVar) => existingEnvVar.key === newEnvVar.key
      );
      if (existingIndex !== -1) {
        combinedEnvVars[existingIndex] = newEnvVar; 
      } else {
        combinedEnvVars.push(newEnvVar);
      }
    });
    return combinedEnvVars;
  }


  const onAdd = useCallback(() => {
    acceptedFiles.forEach((file) => {
      if (!validateFile(file)) return;

      const reader = new FileReader();

      reader.onabort = () => console.error("File reading was aborted");
      reader.onerror = () => console.error("File reading failed");
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const decoder = new TextDecoder();
        const textContent = decoder.decode(binaryStr);

        try {
          const newEnvVars = parseEnvFile(textContent);
          const combinedEnvVars = combineEnvVars(envVars, newEnvVars);
          setEnvVars(combinedEnvVars);
        } catch (error) {
          console.error("Error parsing .env file:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, [acceptedFiles, envVars]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEnvVars([]);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const onCancel = () => {
    setIsOpen(false);
    setEnvVars([]);
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    const envVars = JSON.parse(localStorage.getItem("envVars")) || [];
    setEnvVarsFromLocalStorage(envVars);
  }, []);

  return (
    <div className="rounded-lg bg-white p-4 mb-4 w-full min-h-[400px] relative">
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-bold font-inter text-[#595959]">
          Environment variables
        </span>
        <div className="flex items-center gap-3">
          <img
            role="button"
            onClick={toggleModal}
            src={addIcon}
            alt="add"
            className="h-4 cursor-pointer"
          />
          <img
            src={downloadIcon}
            alt="download"
            className="h-4 cursor-pointer"
          />
        </div>
      </div>
      <div>
        {envVarsFromLocalStorage.length === 0 ? (
          <p className="text-[#595959] text-sm">
            No environment variable created.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {envVarsFromLocalStorage.map((envVar, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border rounded-md p-3 md:w-1/2 w-full"
              >
                <div className="flex gap-4 items-center w-full">
                  <span className="text-[#333333] text-sm w-1/2 font-bold">
                    {envVar.key}
                  </span>
                  <span className="text-[#595959] text-sm w-1/2">
                    {envVar.value}
                  </span>
                </div>
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="h-4 cursor-pointer"
                  onClick={() => {
                    const newEnvVars = envVarsFromLocalStorage.filter(
                      (_, i) => i !== index
                    );
                    localStorage.setItem("envVars", JSON.stringify(newEnvVars));
                    setEnvVarsFromLocalStorage(newEnvVars);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="fixed top-0 left-0  right-0 bottom-0 md:bg-transparent flex items-center md:justify-end justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="p-4 rounded-lg bg-white w-4/5 md:w-1/2 relative md:h-screen h-4/5  shadow-2xl"
            onClick={handleModalClick}
          >
            <XMarkIcon
              className="h-6 w-6 absolute top-2 right-2 cursor-pointer"
              onClick={closeModal}
            />
            {envVars.length === 0 ? (
              <section className="p-3 border border-[#EBEBEB] rounded-md mt-6">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <img src={uploadIcon} alt="upload" className="h-4 mb-2" />
                  <p className="text-[#333333] font-bold">
                    Click or drag file(s) here to upload
                  </p>
                </div>
                <p className="text-[#595959] text-xs mt-1 mb-3">
                  Upload a .env file. It should not be greater than 5KB.
                </p>
                <aside>
                  <h4 className="text-[#595959] text-sm">Files</h4>
                  <ul>{files}</ul>
                </aside>
                <div className="flex items-center justify-end">
                  <button
                    className="border-[#333333] border px-3 py-1 rounded-md"
                    onClick={onCancel}
                  >
                    <span className="text-[#595959] text-sm">Cancel</span>
                  </button>
                  <button
                    className="ml-2 bg-primary-800 px-5 py-1 rounded-md"
                    onClick={onAdd}
                  >
                    <span className="text-[#fff] text-sm">Add</span>
                  </button>
                </div>
              </section>
            ) : (
              <div className=" border rounded-md p-4  mt-6 flex flex-col gap-6">
                {envVars.length !== 0 &&
                  envVars.map((envVar, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex gap-4 items-center w-1/2">
                        <p>
                          <span className="text-[#595959] text-sm">Name</span>
                        </p>
                        <input
                          type="text"
                          placeholder="Key"
                          value={envVar.key}
                          onChange={(e) => {
                            const newEnvVars = [...envVars];
                            newEnvVars[index].key = e.target.value;
                            setEnvVars(newEnvVars);
                          }}
                          className="border border-[#939393] px-3 py-1 rounded-md w-full text-[#333333] text-sm"
                        />
                      </div>
                      <div className="flex gap-4 items-center w-1/2">
                        <p>
                          <span className="text-[#595959] text-sm">Value</span>
                        </p>
                        <input
                          type="text"
                          placeholder="Value"
                          value={envVar.value}
                          onChange={(e) => {
                            const newEnvVars = [...envVars];
                            newEnvVars[index].value = e.target.value;
                            setEnvVars(newEnvVars);
                          }}
                          className="border border-[#939393] px-3 py-1 rounded-md  w-full text-[#333333] text-sm"
                        />
                      </div>
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className="h-4"
                        onClick={() =>
                          setEnvVars(envVars.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}
                <div className="flex items-center justify-end mt-4">
                  <button
                    className="border-[#333333] border px-3 py-1 rounded-md"
                    onClick={onCancel}
                  >
                    <span className="text-[#595959] text-sm">Cancel</span>
                  </button>
                  <button
                    className="ml-2 bg-primary-800 px-5 py-1 rounded-md"
                    onClick={() => {
                      localStorage.setItem("envVars", JSON.stringify(envVars));
                      setEnvVarsFromLocalStorage(envVars);
                      closeModal();
                    }}
                  >
                    <span className="text-[#fff] text-sm">Add</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentVariables;
