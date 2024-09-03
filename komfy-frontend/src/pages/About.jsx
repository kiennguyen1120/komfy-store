const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl ">
          We love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              komfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Welcome to our about page! <br />
        At Komfy, we're passionate about bringing comfort and style into your
        home. Our mission is to provide high-quality furniture that not only
        enhances your living space but also reflects your unique taste and
        personality.
        <br /> With a curated selection of furniture pieces ranging from classic
        to contemporary styles, we aim to cater to every individual's
        preferences and needs. Whether you're looking to furnish a cozy
        apartment or redecorate your entire home, we've got you covered. <br />
        Thank you for choosing Komfy for all your furniture needs. We look
        forward to helping you create the home of your dreams!
      </p>
    </>
  );
};
export default About;
