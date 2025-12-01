function AboutPage() {
  return (
    <div>
      <h2 className="page-title">About this project</h2>
      <p className="page-subtitle">
        Welcome to our About Page!
      </p>

      <p>
        This is a group project developed by Group 1 during the Innovation Pilot course.
        The app is designed to work smoothly on both desktop and mobile devices.
      </p>
      <p> 
        We come from diverse backgrounds and have collaborated to create this web application.

      </p>
      <p>
        Below is a brief overview of our project and how it was created:
      </p>

      <ul>
        <li style={{ marginBottom: "1rem" }}>
          This project is a web application focused on providing a smooth, intuitive, 
          and user-friendly experience. It allows users to easily browse and interact with 
          content through a clean and responsive interface.
        </li>

        <li style={{ marginBottom: "1rem" }}>
          The application is built using React for component-based 
          development, Vite for fast and optimized builds, and 
          React Router for seamless client-side navigation. 
          These technologies help keep the app efficient, modular, and easy to maintain.
        </li>

        <li style={{ marginBottom: "1rem" }}>
          The layout follows a modern and minimal design approach. It is fully responsive, 
          ensuring a consistent experience across different screen sizes. Components were 
          structured with clarity and visual consistency in mind to enhance readability 
          and usability.
        </li>
      </ul>
    </div>
  );
}

export default AboutPage;
