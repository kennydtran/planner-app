import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { generateDate, months } from "./utils/Calendar";
import OutsideDates from "./utils/OutsideDates";
import dayjs from "dayjs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { moveCalendar, moveCalendarOriginal } from "./utils/CalendarMovement";
import TextBoxes from './utils/UserText';

export default function App() {
  console.log(generateDate());

  const days = ["s", "m", "t", "w", "th", "f", "sa"];

  const currentDate = dayjs();

  const [today, setToday] = useState(currentDate);

  const [hasMoved, setHasMoved] = useState(false);
  const [calendarOffset, setCalendarOffset] = useState(0);

  const calendarRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showTextBoxes, setShowTextBoxes] = useState(false);

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  

  const onDateClick = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    moveCalendar(hasMoved, setHasMoved, calendarOffset, setCalendarOffset, 200);
    setIsAnimationComplete(false);
    setShowTextBoxes(true);
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 600);
  };
  

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      moveCalendarOriginal(setHasMoved, setCalendarOffset);
      setIsAnimationComplete(false);
      setShowTextBoxes(false);
      setSelectedDate(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1 className="pl-14 pt-4 w-[460px] font-bold text-[50px] text-br select-none hover:scale-110 duration-300 drop-shadow-md hover:drop-shadow-xl">
        {months[today.month()]}, {today.year()}
      </h1>
      <div
        className={`calendar-container flex justify-center items-center gap-5 text-[20px] pt-8`}
        style={{ transform: `translateX(${calendarOffset}px)` }}
      >
        <MdKeyboardArrowLeft
          className="w-8 h-8 cursor-pointer text-br hover:bg-br2 rounded-[16px] hover:text-softbr hover:drop-shadow-md hover:scale-125 ease-in-out duration-300"
          onClick={() => {
            setToday(today.month(today.month() - 1));
          }}
        />
        <h1
          className="pb-1 px-2 bg-white text-br font-semibold rounded-[16px] cursor-pointer select-none hover:bg-matcha2 hover:text-white hover:font-semibold hover:drop-shadow-md hover:scale-110 ease-in-out duration-300"
          onClick={() => {
            setToday(currentDate);
          }}
        >
          today
        </h1>
        <MdKeyboardArrowRight
          className="w-8 h-8 cursor-pointer text-br hover:bg-br2 hover:text-softbr rounded-[16px] hover:drop-shadow-md hover:scale-125 ease-in-out duration-300"
          onClick={() => {
            setToday(today.month(today.month() + 1));
          }}
        />
      </div>
      <div className="flex-container">
      <div ref={calendarRef} className="flex mx-auto justify-center items-center w-[800px] h-full pt-3">
        <div
          className={`calendar-container w-[800px] h-[725px] border-2 border-br2 rounded-[35px] select-none`}
          style={{ transform: `translateX(${calendarOffset}px)` }}
        >
          <div className="text-center grid grid-cols-7 font-semibold border-b-2 border-br2">
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
                  const hoverClass2 = today
                  ? "text-matcha2 hover:bg-matcha2 hover:text-white"
                  : "hover:bg-br2 hover:text-white";
                 
                  const hoverClass = currentMonth - today
                    ? "hover:bg-softbr text-softbr"
                    : "hover:bg-br2";

                  const isSelectedDate = selectedDate === dayjs(date).format('YYYY-MM-DD');

                  let backgroundClass = '';
                  if (isSelectedDate && today) {
                    backgroundClass = 'bg-matcha2 text-white';
                  } else if (isSelectedDate) {
                    backgroundClass = 'bg-br2 text-white';
                  }

                  return (
                    <div
                      key={index}
                      className={`${hoverClass2} ${backgroundClass} select-none scale-75 hover:scale-100 cursor-pointer transition duration-300 text-[36px] font-light font-sans flex justify-center items-center h-28 rounded-[30px] ${hoverClass} `}
                    onClick={() => {
                      if (currentMonth) {
                        onDateClick(date);
                      }
                    }}

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
        <TextBoxes selectedDate={selectedDate} isVisible={showTextBoxes && isAnimationComplete} />
        </div>

      </div>
    </div>
  );
}
