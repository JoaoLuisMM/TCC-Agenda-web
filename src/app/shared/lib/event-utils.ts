import {CalendarOptions, EventInput} from '@fullcalendar/core';
import {signal} from "@angular/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

let eventGuid = 0;

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Consulta',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Evento1',
    start: TODAY_STR + 'T16:30:00',
    end: TODAY_STR + 'T17:00:00'
  },
  {
    id: createEventId(),
    title: 'Evento2',
    start: TODAY_STR + 'T15:00:00',
    end: TODAY_STR + 'T16:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}

export const configCalendar: CalendarOptions = {
  plugins: [
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
  ],
  locale: 'pt-br',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  height: '35rem',
  buttonText: {
    today:    'Hoje',
    month:    'Mês',
    week:     'Semana',
    day:      'Dia',
    list:     'Lista'
  },
  titleFormat: { year: 'numeric', month: 'long' },
  initialView: 'dayGridMonth',
  initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  showNonCurrentDates: true,
  hiddenDays: [0,6],
  // select: this.handleDateSelect.bind(this),
  // eventClick: this.handleEventClick.bind(this),
  // eventsSet: this.handleEvents.bind(this)
  /* you can update a remote database when these fire:
  eventAdd:
  eventChange:
  eventRemove:
  */
};
