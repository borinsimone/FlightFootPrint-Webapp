import React, { useEffect, useState } from "react";

function Output({
  emissionData,
  legs,
  flgihtExist,
  isDropdownOpen,
  setIsDropdownOpen,
  totalPassengers,
  setEmissionData,
}) {
  const [outputOpen, setOutputOpen] = useState(false);
  useEffect(() => {
    if (emissionData) {
      setOutputOpen(true);
    }
  }, [emissionData]);

  return (
    <div
      className={`output absolute text-black capitalize  bg-[#E1D7C6]/80 backdrop-blur-md
        h-full w-full   flex flex-col items-center justify-center gap-4 md:gap-6 duration-500
        ${outputOpen ? "opaciti-1 z-50" : "opaciti-0 -z-50"}
      

      `}
    >
      <div
        className={`general-data   flex flex-col gap-4 w-[80%]  duration-500 ${
          emissionData ? "opacity-1" : "opacity-0"
        } 
        ${
          emissionData && emissionData.legs.length > 1
            ? "lg:w-[60%]"
            : "lg:w-[30%]"
        }
         lg:gap-6`}
      >
        <div className="total flex items-center justify-center gap-2 h-8 md:h-12 bg-[#F8F4EA]   rounded-lg p-2 md:p-3 ">
          <span>total C02:</span>
          {emissionData ? emissionData.co2e.toFixed(2) : ""}
          {emissionData ? emissionData.co2e_unit : ""}
        </div>
        <div className="individual  flex items-center justify-center gap-2 h-8 md:h-12 bg-[#F8F4EA]   rounded-lg p-2 md:p-3 ">
          <span>C02/passengers: </span>

          {emissionData
            ? (
                emissionData.co2e /
                (totalPassengers / legs.length)
              ).toFixed(2)
            : ""}
          {emissionData ? emissionData.co2e_unit : ""}
        </div>
      </div>

      {emissionData &&
      emissionData.legs.length === 1 &&
      flgihtExist ? (
        <div
          className={`recap w-[80%] lg:w-[30%] bg-[#F8F4EA] rounded-lg flex flex-col justify-center items-center capitalize relative 
             lg:h-[200px] duration-500 ${
               emissionData ? "opacity-1" : "opacity-0"
             } `}
        >
          <div className="recap-logo absolute left-3 top-3">
            recap:
          </div>
          <div className="recap-container my-3 w-[50%] lg:w-[60%] ">
            <div className="recap-from-to  w-full flex justify-between">
              <span>flight:</span>
              {`${legs[0].from} - ${legs[0].to}`}
            </div>
            <div className="recap-class w-full flex justify-between">
              <span>class:</span> {`${legs[0].class}`}
            </div>
            <div className="recap-passengers w-full flex justify-between">
              <span>n. passengers:</span>
              {`${legs[0].passengers}`}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        className={`multi-flight w-[80%] overflow-y-scroll flex flex-col gap-4  md:gap-6 ${
          emissionData && emissionData.legs.length > 1
            ? "lg:w-[50%]"
            : "lg:w-0"
        } `}
      >
        {emissionData && emissionData.legs.length > 1
          ? emissionData.legs.map((item, i) => (
              <div
                key={i}
                className="individual-flight flex flex-col bg-[#F8F4EA] cursor-pointer   justify-center rounded-lg  "
                onClick={() => {
                  setIsDropdownOpen((prevState) =>
                    prevState.map((item, index) =>
                      index === i ? !item : false
                    )
                  );
                }}
              >
                <div className="emission-header md:h-12 p-2 md:p-3 w-full flex items-center justify-between">
                  <span className="">
                    recap. flight {i + 1}
                  </span>
                  {`${legs[i].from} - ${legs[i].to}`}
                </div>

                <div
                  className={`dropdown emission flex  overflow-hidden px-2 md:px-3  w-full 
            ${
              isDropdownOpen[i]
                ? " opacity-1 h-[4em] dropdown-open "
                : "opacity-0 h-0 dropdown-close"
            }`}
                >
                  <div className="left w-[50%] flex flex-col gap-2 ">
                    <div className="total flex items-center gap-1">
                      <span className="">total:</span>
                      {emissionData.legs[i].co2e.toFixed(2)}
                      {emissionData.legs[i].co2e_unit}
                    </div>
                    <div className="individual flex gap-1">
                      <span>individual:</span>
                      {(
                        emissionData.legs[i].co2e /
                        legs[i].passengers
                      ).toFixed(2)}
                      {emissionData
                        ? emissionData.co2e_unit
                        : ""}
                    </div>
                  </div>
                  <div className="right w-[50%] flex flex-col gap-2 items-end ">
                    <div className="drop-class flex gap-1">
                      <span>class:</span>
                      {`${legs[i].class}`}
                    </div>
                    <div className="drop-passengers flex gap-1">
                      <span>n. passengers:</span>
                      {`${legs[i].passengers}`}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      <button
        className="bg-black/50 rounded py-1 px-3 text-white capitalize"
        onClick={() => {
          setOutputOpen(false);
          setTimeout(() => {
            setEmissionData();
          }, 3000);
        }}
      >
        close
      </button>
    </div>
  );
}

export default Output;
