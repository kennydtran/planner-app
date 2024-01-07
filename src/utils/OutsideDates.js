export default function OutsideDates(...classes) {
    return classes.filter(Boolean).join(" ");
}