# Kapstan Web App

As part of the Kapstan interview process, I have developed a web application that mimics the design from Figma. The web application is built using React.js and utilizes various APIs to fetch data for display. The application allows users to switch between multiple applications, view dashboard overviews, and manage environment variables as required.

## Features

- **Side and Top Navigation Bar**: Mimics the design from Figma for easy navigation.
- **Application Management**: Users can switch between multiple applications using the applications dropdown in the top nav bar.
- **Dashboard Overview**:
  - Displays application version and live status.
  - Shows CPU and memory metrics for all apps as a timetrend. Hovering over a timestamp displays the exact value in a tooltip.
  - Shows deployment history for the application.
- **Environment Variables Management**: Users can manage environment variables as per the designs in Figma.
- **Data Integration**: Integrates with various APIs to fetch data for display:
  - Applications API: [https://retoolapi.dev/71NNjB/applications](https://retoolapi.dev/71NNjB/applications)
  - Memory Utilization API: [https://retoolapi.dev/ybFVVH/memoryutilization](https://retoolapi.dev/ybFVVH/memoryutilization)
  - CPU Utilization API: [https://retoolapi.dev/Ymxfa2/cpuutilization](https://retoolapi.dev/Ymxfa2/cpuutilization)
  - Event History API: [https://retoolapi.dev/TYjDIe/eventhistory](https://retoolapi.dev/TYjDIe/eventhistory)
- **Retained Environment variables**: Environment variables are retained in local storage for persistence across page refreshes.
- **Styling**: Utilizes React Tailwind CSS for styling components.
- **Chart Display**: Utilizes Chart.js for displaying charts.
- **Date Handling**: Utilizes Moment.js for handling time.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.

## Usage

1. Navigate through the web application using the side and top navigation bars.
2. Switch between applications using the dropdown in the top nav bar.
3. Explore the dashboard overview for each application.
4. Manage environment variables as required.

## Additional Information

- **Framework**: React.js
- **Styling**: React Tailwind CSS
- **Chart Library**: Chart.js
- **Date Library**: Moment.js
- **Deployment**: The application is deployed using Netlify.
- **Code Repository**: [GitHub Repository](https://github.com/hemaljoshi/react-assignment.git)
- **Live Link**: [Live Demo](https://react-assignment-eight-ochre.vercel.app/)

Feel free to explore the codebase and reach out for any further questions or clarifications!
