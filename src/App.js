import "./App.css";
import React, { useState } from "react";
import { generateDate, months } from "./utils/Calendar";
import OutsideDates from "./utils/OutsideDates";
import dayjs from "dayjs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function App() {
  console.log(generateDate());

  const days = ["s", "m", "t", "w", "th", "f", "sa"];

  const currentDate = dayjs();

  const [today, setToday] = useState(currentDate);

  return (
    <div>
      <h1 className="px-10 py-5 font-bold text-[50px] text-br select-none hover:scale-110 hover:translate-x-20 duration-300">
        {months[today.month()]}, {today.year()}
      </h1>
      <div className="flex justify-center items-center gap-5 text-[20px]">
        <MdKeyboardArrowLeft
          className="w-8 h-8 cursor-pointer hover:bg-lightbr rounded-[16px] hover:scale-125 ease-in-out duration-300"
          onClick={() => {
            setToday(today.month(today.month() - 1));
          }}
        />
        <h1 className="pb-1 px-2 bg-white rounded-[16px] cursor-pointer select-none hover:bg-matcha hover:scale-110 ease-in-out duration-300"onClick={() => {
            setToday(currentDate);
          }}>today</h1>
        <MdKeyboardArrowRight
          className="w-8 h-8 cursor-pointer hover:bg-lightbr rounded-[16px] hover:scale-125 ease-in-out duration-300"
          onClick={() => {
            setToday(today.month(today.month() + 1));
          }}
        />
      </div>
      <div className="flex justify-center items-center h-full pt-3">
        <div className="w-[800px] h-[725px] border-2 border-lightbr rounded-[35px] select-none">
          <div className="text-center grid grid-cols-7 font-semibold border-b-2 border-lightbr">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="h-12 flex justify-center items-center text-[24px] text-br hover:scale-150 duration-300"
                >
                  {day}
                </h1>
              );
            })}
          </div>
          <div>
            <div className="grid grid-cols-7">
              {generateDate(today.month(), today.year()).map(
                ({ date, currentMonth, today }, index) => {
                  const hoverClass = currentMonth
                    ? "hover:bg-matcha hover:text-white"
                    : "hover:bg-lightbr";
                  const hoverClass2 = today
                    ? "text-matcha hover:bg-softbr hover:text-white"
                    : "hover:bg-matcha";

                  return (
                    <div
                      key={index}
                      className={`${hoverClass2} select-none scale-75 hover:scale-100 cursor-pointer transition duration-300 text-[36px] text-softbr font-light font-sans flex justify-center items-center h-28 rounded-[30px] ${hoverClass} `}
                    >
                      <h1
                        className={OutsideDates(
                          currentMonth ? "" : "text-white",
                          today ? "font-extrabold text-[48px]" : ""
                        )}
                      >
                        {date.date()}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
