import * as Slider from "@radix-ui/react-slider";
import React, { useState } from "react";

interface PrettySliderProps {
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
  unit?: string;
  onChange?: (val: number) => void;
}

const PrettySlider: React.FC<PrettySliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initial = Math.round((min + max) / 2),
  unit = "",
  onChange = () => {},
}) => {
  const [value, setValue] = useState<number[]>([initial]);

  const handleChange = (val: number[]) => {
    setValue(val);
    if (onChange) onChange(val[0]);
  };

  return (
    <div style={{ padding: "10px 0", position: "relative" }}>
      <Slider.Root
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 30,
        }}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleChange}
      >
        <Slider.Track
          style={{
            backgroundColor: "#ccc",
            position: "relative",
            flexGrow: 1,
            height: 6,
            borderRadius: 4,
          }}
        >
          <Slider.Range
            style={{
              backgroundColor: "#3b82f6",
              height: "100%",
              borderRadius: 4,
              position: "absolute",
            }}
          />
        </Slider.Track>
        <Slider.Thumb
          style={{
            width: 20,
            height: 20,
            backgroundColor: "#3b82f6",
            borderRadius: "50%",
            position: "relative",
            boxShadow: "0 0 0 2px white",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#000",
              color: "#fff",
              padding: "2px 6px",
              borderRadius: 4,
              fontSize: 12,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {value[0]} {unit}
          </div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};

export default PrettySlider;
