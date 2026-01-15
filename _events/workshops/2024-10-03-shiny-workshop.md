---
title: Workshop Shiny for education and valorization
date: 2024-10-03
time: "13:00 - 17:00"
author: Karel Kroeze
tags:
    - workshop
    - R
    - Shiny
    - interactive visualizations
    - reactive programming
    - visualizations
    - research
    - education
    - interactive documents
    - interactive reports
frontpage: true
image: /assets/images/workshops/shiny-2024.svg
events: 
    - title: What is Shiny? Under-the-hood overview.
      description: Overview of what a Shiny app is, and the main components. How the user interface (UI) and server-side components interact, and the minimum required code to make a Shiny app.
      start: 2024-10-03 13:00
      end: 2024-10-03 13:45
      type: lectures
    - title: My first Shiny app
      description: Guided hands-on setting up a basic Shiny app, covering file structures and creating a very basic app.
      start: 2024-10-03 13:45
      end: 2024-10-03 14:15
      type: practicals
    - title: Break
      start: 2024-10-03 14:15
      end: 2024-10-03 14:30
      type: socials
    - title: Reactive Programming
      description: Overview of the reactive programming paradigm. Reactive expressions, observers, and controlling dependency flows.
      start: 2024-10-03 14:30
      end: 2024-10-03 15:00
      type: lectures
    - title: Make it yours
      description: Guided hands-on creating a Shiny app for your own visualization, model, or dataset. Bring your own, or use one of the examples provided. 
      start: 2024-10-03 15:00
      end: 2024-10-03 15:45
      type: practicals
    - title: Break
      start: 2024-10-03 15:45
      end: 2024-10-03 16:00
      type: socials
    - title: Make it yours (continued)
      description: Guided hands-on creating a Shiny app for your own visualization, model, or dataset. Bring your own, or use one of the examples provided. 
      start: 2024-10-03 16:00
      end: 2024-10-03 16:30
      type: practicals
    - title: Sharing is Caring
      description: Quick overview and hands-on on how to publish your app online on shinyapps.io.
      start: 2024-10-03 16:30
      end: 2024-10-03 17:00
      type: lectures

---



A picture says more than a thousand words. But can you have a conversation with a picture? With R and Shiny, you can!

## Overview
BDSi is organizing a workshop on creating interactive visualizations with R and Shiny. In one afternoon, we'll quickly introduce the basic concepts, and build an interactive visualization together. You can bring your own data, or work on an example provided by BDSi. We'll specifically focus on two example use-cases: an app letting students explore statistical concepts, and one making a predictive model available to users. At the end of the day, you will be able to create and share interactive visualizations to communicate your research, or help explain complex topics to your students yourself.

## What is Shiny?
Shiny is an R package that enables R to interact with websites, allowing for interactive websites that can update when new data is available, the user interacts with the website, and much more. A large gallery of applications built on R is available on <https://shiny.rstudio.com/gallery/>. BDSi has also created a number of apps - ranging from small interactive examples for education (e.g., Figure 1, a [Normal Distribution](https://bookdown.org/pingapang9/linear_models_bookdown/intro.html#fig:app-normal) app developed for a [linear methods]({% link _projects/wsv/linear-models-interactive-book.md %}) textbook for Social Sciences students, or the [BMS visualization library](https://bdsi.shinyapps.io/bms-visualization-tool/) helping choose between different visualization options for different types of data), research (e.g., Figure 2, [PACBOARD](https://bdsi.shinyapps.io/pacboard/), a dashboard for the exploration of meta-models of probabilistic analysis in healthcare economics).

{% include figure.html iframe="https://bdsi.shinyapps.io/linear-models-book__normal-distribution/" caption="A simple normal distribution for students to interact with" %} 

Interactive visualizations are a great way to let your audience - whether they be students, academics, or the general public - explore and understand complex topics, datasets and analyses. Best of all, creating simple interactive visualizations is easy, and there are reliable and free options available to host the visualizations you've created.

{% include figure.html iframe="https://bdsi.shinyapps.io/pacboard/" caption="PACBOARD: A dashboard for the systematic exploration and validation of the inputs and outputs of a probabylistic analysis obtained from a health economic model" %} 

## Workshop Details

### Contents
In this workshop, you will develop an interactive version of an existing visualization, analysis, or dataset (we encourage you to bring your own, but we will also have examples available), and publish it online. At the end of the day, you will be able to develop simple applications and share them with your audience.

### Requirements
Basic familiarity with R and ggplot2 (or whichever plotting library you prefer). If you already have an analysis, model, dataset, etc. that you want to build a Shiny application around that's great, but you can also participate with one of the examples we provide. 

Don't forget to bring your laptop, and make sure you have a working and up-to-date R/RStudio installation before we start! 

### Schedule 
The (target) schedule alternates short lectures with hands-on sessions, immediately applying what we cover in the lectures. Breaks are planned, but exact times may change based on how the day progresses. If you have limited time, feel free to join us when you can - but please let us know in advance if you're planning to join later or leave early so that we can plan accordingly.

<link rel="stylesheet" href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css" />
<script src="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.js"></script>
<div id="calendar"></div>

<style>
  #calendar {
    height: 400px;
    /* position: fixed; */
  }
  #calendar .toastui-calendar-timegrid {
    min-height: 0;
    height: 100% !important;
  }
  #calendar .toastui-calendar-panel {
    overflow-y: unset;
  }
  .event-body {
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
  }
</style>

<script>
  const Calendar = tui.Calendar;
  const format_time = new Intl.DateTimeFormat('en-GB', {
    timeStyle: "short"
  })
  
  const calendar = new Calendar('#calendar', {
    defaultView: 'day',
    isReadOnly: true,
    useDetailPopup: false,
    day: {
        hourStart: 13,
        hourEnd: 17
    },
    week: {
      startDayOfWeek: 1,
      hourStart: 13.5,
      hourEnd: 17.5,
      narrowWeekend: true,
      taskView: false,
      eventView: ['time']
    },
    theme: {
      common: {
        dayName: { color: "#333" },
        holiday: { color: "#9e9e9e" },
        saturday: { color: "#9e9e9e" }
      },
      week: {
        dayName: {
          borderBottom: "none"
        },
        timeGrid: {
          borderRight: "1px dashed #eee"
        }
      }
    },
    template: {
      timegridDisplayPrimaryTime({time}) {
        return format_time.format(time);
      },
      time(event) {
        return `<span>${format_time.format(event.start)} - ${format_time.format(event.end)}</span>: <span style="color: black; font-weight: bold;">${event.title}</span><div class="event-body">${event.body}</div>`;
      },
      popupDetailDate({ start, end }) {
        return `${format_time.format(start)} - ${format_time.format(end)}`;
      }
    },
    calendars: [
      {
        id: 'lectures',
        name: 'Lectures',
        backgroundColor: '#03bd9e',
      },
      {
        id: 'practicals',
        name: 'Practicals',
        backgroundColor: '#00a9ff',
      },
      {
        id: 'socials',
        name: "Social events",
        backgroundColor: '#bb3aff'
      }
    ],
    usageStatistics: false
  });

  calendar.setDate(new Date("{{ page.date }}"))
  calendar.createEvents([
    {% for event in page.events %}

    {
      calendarId: "{{event.type}}",
      title: "{{event.title}}",
      start: new Date("{{event.start}}"),
      end: new Date("{{event.end}}"),
      location: "{{event.location | default: 'TBA'}}",
      body: "{{event.description}}"
    },

    {% endfor %}
  ])
</script>

### Date & Location
**Date**: October 3rd, 13:00 - 17:00  
**Location**: TBA, on campus

## Registration
<a class="button" href="https://www.utwente.nl/en/bms/research/bdsi/workshop-shiny-2024/" target="_blank">Register now!</a>

For questions about this workshop, please contact <{{ site.data.contact.email }}>.
