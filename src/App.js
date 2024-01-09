import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { generateDate, months } from "./utils/Calendar";
import dayjs from "dayjs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { moveCalendar, moveCalendarOriginal } from "./utils/CalendarMovement";
import TextBoxes from "./utils/UserText";

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
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    moveCalendar(hasMoved, setHasMoved, calendarOffset, setCalendarOffset, 200);
    setIsAnimationComplete(false);
    setShowTextBoxes(true);
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 0);
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
    <div className="bg-brback">
      <div>
        <h1 className="pl-14 pt-4 w-[460px] font-bold text-[50px] text-br origin-top-left hover:rotate-[3deg] select-none hover:scale-110 hover: duration-300 drop-shadow-md hover:drop-shadow-xl">
          {months[today.month()]}, {today.year()}
        </h1>
        <div
          className={`calendar-container flex justify-center items-center gap-5 text-[20px] pb-3 pt-8`}
          style={{ transform: `translateX(${calendarOffset}px)` }}
        >
          <MdKeyboardArrowLeft
            className="w-8 h-8 cursor-pointer text-br hover:bg-br2 hover:text-softbr rounded-[16px] text-br hover:drop-shadow-md hover:scale-125 ease-in-out duration-300"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <h1
            className="pb-1 px-2 bg-brback text-br font-semibold rounded-[16px] cursor-pointer select-none hover:bg-matcha2 hover:text-brback hover:font-semibold hover:drop-shadow-md hover:scale-110 ease-in-out duration-300"
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
        <div className="flex-container overflow-hidden">
          <div
            ref={calendarRef}
            className="flex mx-auto justify-center items-center w-[800px] h-full"
          >
            <div
              className={`calendar-container w-[800px] h-[732px] border-4 border-br2 rounded-[15px] select-none`}
              style={{ transform: `translateX(${calendarOffset}px)` }}
            >
              <div className="text-center grid grid-cols-7 font-semibold border-b-4 border-br2">
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
                        ? "text-matcha2 hover:bg-matcha2 hover:text-brback font-[700] text-[36px] font-[600] border-[4px] rounded-[15px] border-matcha2"
                        : "hover:bg-br2 hover:text-brback";

                      const hoverClass =
                        currentMonth - today
                          ? "hover:bg-softbr text-softbr"
                          : "hover:bg-br2";

                      const outsideDate = currentMonth ? "" : "text-brback";

                      const isSelectedDate =
                        selectedDate === dayjs(date).format("YYYY-MM-DD");

                      const dateKey = dayjs(date).format("YYYY-MM-DD");
                      const storedData = localStorage.getItem(dateKey);
                      const hasData = storedData && JSON.parse(storedData);
                      const hasReminders = hasData && hasData.reminders !== "";
                      const hasDailyTasks =
                        hasData && hasData.dailyTasks !== "";
                      const hasUpcomingEvents =
                        hasData && hasData.upcomingEvents !== "";

                      let backgroundClass = "";
                      if (isSelectedDate && today) {
                        backgroundClass = "bg-matcha2 text-white";
                      } else if (isSelectedDate) {
                        backgroundClass = "bg-softbr text-white";
                      }

                      return (
                        <div
                          key={index}
                          className={`${hoverClass2} ${outsideDate} ${backgroundClass} select-none scale-75 hover:scale-100 cursor-pointer transition duration-[0.3s] text-[36px] font-light font-sans flex justify-center items-center h-28 rounded-[10px] ${hoverClass} `}
                          onClick={() => {
                            if (currentMonth) {
                              onDateClick(date);
                            }
                          }}
                        >
                          <div className="date-cell">
                            <div className="date-number">{date.date()}</div>
                            <div className="dots-container">
                              {hasReminders && (
                                <span className="dot reminders-dot bg-br"></span>
                              )}

                              {hasDailyTasks && (
                                <span className="dot daily-tasks-dot bg-br"></span>
                              )}

                              {hasUpcomingEvents && (
                                <span className="dot upcoming-events-dot bg-br"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <TextBoxes
              selectedDate={selectedDate}
              isVisible={showTextBoxes && isAnimationComplete}
            />
          </div>
        </div>
      </div>
      <footer className="bg-brback p-[200px]">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}
