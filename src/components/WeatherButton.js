import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css";

const WeatherButton = ({
  cities,
  setCity,
  getCurrentLocation,
  selected,
  setSelected,
}) => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button
        className={`btn ${selected === "curr" ? "clicked" : ""}`}
        onClick={() => {
          getCurrentLocation();
          setSelected("curr");
        }}
      >
        Current Location
      </Button>
      {cities.map((item, index) => {
        return (
          <Button
            className={`btn ${selected === item ? "clicked" : ""}`}
            key={index}
            onClick={() => {
              setCity(item);
              setSelected(item);
            }}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
