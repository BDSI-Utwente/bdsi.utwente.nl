---
title: Ylab
subtitle: YLab is Your Lab
date: 2022-02-24
authors:
    - Martin Schmettow
    - Peter ten Klooster
    - Karel Kroeze
---

Last year, BDSi created [YET](https://github.com/schmettow/YET) (is your eye tracker), a capable, DIY eye tracking device, that many students have used for their own projects, since. This year, we are back with: YLab (is your Lab)

YLab is funded as a WSV Innovation in Education project to create a student-friendly platform for programmable sensor arrays, with focus on physiological signals. Physiological signals can be used in many practical research situations to measure activity, workload or stress, but also to study patterns in learning new skills. This fall, YLab was born, including support for electrodermal activity, electrocardiography and 3DoF motion capture. We have also added moment-of-interest recording (MOI), which allows collecting self-report measures.

With the current hardware choices, a setup with EDA and ECG sensors can cost less than a textbook. Beyond the price tag, YLab is designed to promote ownership in terms of command. With the YLab packages a useful application can be written in under 50 lines of Python code, which makes for a fun way to teach first programming courses. As of writing, 70 Psychology students are doing their first steps in Python on YLab, and by the end of the quarter, some capable research instruments will be in capable hands.

YLab comes as a set of four Python packages and is available on [GitHub](https://github.com/schmettow/YLab), which all include some demos and examples. It is programmed for [CircuitPython](https://circuitpython.org/) for the widely available [RP2040 microcontroller](https://www.raspberrypi.com/products/rp2040/specifications/).

-   _Sensory_ (is your sensor array) unifies the process of connecting to and sampling from sensors
-   _YUI_ (is your user interface) makes creating user interfaces easy
-   _Ydata_ (is your data) provides a simple and secure way to store sensor data
-   _Ynot_ (is your network of things) will allow connecting programmable sensors to form larger arrays

The second phase of the project is ahead of us and will be all about bringing physiological measures to the classroom as a first-hand experience. We will create a set of standardized learning material, making it easy to integrate the matter in your courses. Multiple student projects and a challenge-based teaching course will further explore the possibilities of YLab.

For further questions regarding the project, contact m.schmettow@utwente.nl
