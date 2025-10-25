import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { obtenerActividades } from "../services/api";
import "./CalendarioMesFiltro.css";

// Configura el locale antes del localizer
moment.locale("es");
const localizer = momentLocalizer(moment);

export default function CalendarioMesFiltro({ onSelectSlotDate }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await obtenerActividades();
        const ev = res.data.map((act) => ({
          title: act.descripcion,
          start: new Date(`${act.fecha}T${act.hora || "00:00"}`),
          end:   new Date(`${act.fecha}T${act.hora || "00:00"}`),
          allDay: true,
          actividad: act,
        }));
        setEvents(ev);
      } catch (err) {
        console.error("Error al cargar actividades:", err);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    setCurrentDate(new Date(year, month, 1));
  }, [year, month]);

  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
  const meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  return (
    <div className="calendario-mes-container">
      <div style={{ marginBottom: "10px", display: "flex", gap: "1rem", alignItems: "center" }}>
        <label>
          <strong>Año:</strong>{" "}
          <select value={year} onChange={(e) => setYear(parseInt(e.target.value,10))}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label>
          <strong>Mes:</strong>{" "}
          <select value={month} onChange={(e) => setMonth(parseInt(e.target.value,10))}>
            {meses.map((m,index) => <option key={index} value={index}>{m}</option>)}
          </select>
        </label>
      </div>

      <Calendar
        localizer={localizer}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        selectable
        onSelectSlot={(slotInfo) => onSelectSlotDate(slotInfo.start)}
        onSelectEvent={(event) => onSelectSlotDate(event.start)}
        style={{ height:"650px", width:"100%" }}
        culture="es"
        messages={{
          today: "Hoy",
          previous: "<",
          next: ">",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Actividad",
          noEventsInRange: "No hay actividades en este rango.",
        }}
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, "ddd", culture).replace(".", ""),
          monthHeaderFormat: (date, culture, localizer) =>
            localizer.format(date, "MMMM YYYY", culture),
        }}
        firstDayOfWeek={1}
      />
    </div>
  );
}
