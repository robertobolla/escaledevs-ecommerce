import React from "react";

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex  ">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Access &nbsp;
            <strong className="font-extrabold text-primary-dark sm:block">
              {" "}
              Templates & Source Code
            </strong>
          </h1>

          <h2 className="mt-4 sm:text-3xl/relaxed">
            for professional projects.{" "}
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary-light px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-dark focus:outline-none focus:ring active:bg-primary-light sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary-light shadow hover:text-primary-dark focus:outline-none focus:ring active:text-primary-light sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
