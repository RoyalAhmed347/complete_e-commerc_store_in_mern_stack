import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import FeatureProducts from "../components/FeatureProducts";

const Home = () => {
  return (
    <>
      <Hero data={"Wal Mart E-Commarce"} />
      <FeatureProducts />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
