import dayjs from "dayjs";


export const generateDate = (
    
    month = dayjs().month(), 
    year = dayjs().year()

    ) => {

        const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
        const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

        const arrayOfDate = [];

        // Generates the prefix dates.
        for (let i = 0; i < firstDateOfMonth.day(); i++) {

            arrayOfDate.push({
                currentMonth: false, 
                date: firstDateOfMonth.day(i)
            });

        }


        // Generates the current date.
        for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {

            arrayOfDate.push({
                currentMonth: true, 
                today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(), 
                date: firstDateOfMonth.date(i)
            });

        }

        // Generates the suffix dates.
        const remainingDays = 42 - arrayOfDate.length;

        for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remainingDays; i++) {
            
            arrayOfDate.push({
                currentMonth: false, 
                date: lastDateOfMonth.date(i)
            });

        }


        return arrayOfDate;

};

export const months = [

    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "movember",
    "december",
];