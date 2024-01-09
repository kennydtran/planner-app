import React, { useState, useEffect } from 'react';
import '../App.css';

export default function TextBoxes({ selectedDate, isVisible }) {
  const [reminders, setReminders] = useState('');
  const [dailyTasks, setDailyTasks] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState('');
  
  const handleFocus = (e) => {
    e.target.previousSibling.classList.add('focused');
  };

  const handleBlur = (e) => {
    e.target.previousSibling.classList.remove('focused');
  };

  useEffect(() => {
    const storedData = localStorage.getItem(selectedDate);
    if (storedData) {
      const data = JSON.parse(storedData);
      setReminders(data.reminders);
      setDailyTasks(data.dailyTasks);
      setUpcomingEvents(data.upcomingEvents);
    } else {
      setReminders('');
      setDailyTasks('');
      setUpcomingEvents('');
    }
  }, [selectedDate]);

  useEffect(() => {
    const data = {
      reminders,
      dailyTasks,
      upcomingEvents,
    };
    localStorage.setItem(selectedDate, JSON.stringify(data));
  }, [reminders, dailyTasks, upcomingEvents, selectedDate]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="text-box-container">
      <div className='text-box-reminders transition ease-in-out duration-300 bg-brback font-bold select-none'>Reminders</div>
      <textarea className='reminders w-[400px] h-[237px] px-[20px] py-[40px] rounded-[30px] border-4 border-br2 placeholder:text-br placeholder:font-light select-none text-br bg-brback' onFocus={handleFocus} onBlur={handleBlur} style={{ outline: 'none'}} value={reminders} onChange={(e) => setReminders(e.target.value)}/>
      <div className='text-box-daily transition ease-in-out duration-300 bg-brback font-bold select-none'>Daily Tasks</div>
      <textarea className='daily w-[400px] h-[237px] px-[20px] py-[40px] rounded-[30px] border-4 border-br2 placeholder:text-br placeholder:font-light select-none text-br bg-brback' onFocus={handleFocus} onBlur={handleBlur} style={{ outline: 'none'}} value={dailyTasks} onChange={(e) => setDailyTasks(e.target.value)}/>
      <div className='text-box-upcoming transition ease-in-out duration-300 bg-brback font-bold select-none'>Upcoming Events</div>
      <textarea className='upcoming w-[400px] h-[237px] px-[20px] py-[40px] rounded-[30px] border-4 border-br2 placeholder:text-br placeholder:font-light select-none text-br bg-brback' onFocus={handleFocus} onBlur={handleBlur} style={{ outline: 'none'}} value={upcomingEvents} onChange={(e) => setUpcomingEvents(e.target.value)}/>
    </div>
  );
}