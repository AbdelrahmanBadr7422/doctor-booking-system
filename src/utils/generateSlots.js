export const generateSlots = (doctor, date) => {
  const day = new Date(date)
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase();

  if (!doctor.workingDays.includes(day)) return [];
  if (doctor.offDates.includes(date)) return [];

  const start = new Date(`${date}T${doctor.workingHours.start}`);
  const end = new Date(`${date}T${doctor.workingHours.end}`);

  let current = new Date(start);
  const slots = [];

  while (current < end) {
    const time = current.toTimeString().slice(0, 5);

    const isBreak = doctor.breaks.some(
      (b) => time >= b.start && time < b.end
    );

    if (!isBreak) slots.push(new Date(current));

    current.setMinutes(current.getMinutes() + doctor.sessionDuration);
  }

  return slots;
};