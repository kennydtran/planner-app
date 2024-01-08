import React, { useState, useEffect } from 'react';

export default function TextBoxes({ selectedDate, isVisible }) {
  const [reminders, setReminders] = useState('');
  const [dailyTasks, setDailyTasks] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState('');

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
      <textarea value={reminders} onChange={(e) => setReminders(e.target.value)} placeholder="Reminders" />
      <textarea value={dailyTasks} onChange={(e) => setDailyTasks(e.target.value)} placeholder="Daily Tasks" />
      <textarea value={upcomingEvents} onChange={(e) => setUpcomingEvents(e.target.value)} placeholder="Upcoming Events" />
    </div>
  );
}
