import React, { useState, useRef, useEffect } from "react";

export default function FancySlider({ min = 0, max = 100, step = 1, unit = "" }) {
  const [value, setValue] = useState((min + max) / 2);
  const [thumbLeft, setThumbLeft] = useState(0);
  const rangeRef = useRef(null);

  const updateThumbPosition = (val) => {
    const range = rangeRef.current;
    if (!range) return;

    const percent = (val - min) / (max - min);
    const width = range.offsetWidth;
    const thumbOffset = percent * width;
    setThumbLeft(thumbOffset);
  };

  useEffect(() => {
    updateThumbPosition(value);
  }, [value]);

  const handleChange = (e) => {
    const val = Number(e.target.value);
    setValue(val);
    updateThumbPosition(val);
  };

  return (
    <div style={{ position: "relative", width: "100%", padding: "40px 0" }}>
      <input
        ref={rangeRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        style={{
          width: "100%",
          appearance: "none",
          height: 6,
          borderRadius: 5,
          background: "#ddd",
          outline: "none",
          padding: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: thumbLeft,
          transform: "translateX(-50%)",
          background: "#111",
          color: "#fff",
          padding: "4px 8px",
          borderRadius: 8,
          fontSize: 12,
          whiteSpace: "nowrap",
        }}
      >
        {value} {unit}
      </div>
    </div>
  );
}
