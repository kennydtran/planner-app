// export function moveCalendar(hasMoved, setHasMoved, calendarOffset, setCalendarOffset, movementAmount) {
//     if (!hasMoved) {
//       setCalendarOffset(calendarOffset - movementAmount);
//       setHasMoved(true);
//     }
//   }
  
//   export function moveCalendarOriginal(setHasMoved, setCalendarOffset) {
//     setCalendarOffset(0);
//     setHasMoved(false);
//   }
  
export function moveCalendar(hasMoved, setHasMoved, calendarOffset, setCalendarOffset, movementAmount) {
    if (!hasMoved) {
      setCalendarOffset(calendarOffset - movementAmount);
      setHasMoved(true);
    }
  }
  
  export function moveCalendarOriginal(setHasMoved, setCalendarOffset) {
    setCalendarOffset(0);
    setHasMoved(false);
  }
  
  