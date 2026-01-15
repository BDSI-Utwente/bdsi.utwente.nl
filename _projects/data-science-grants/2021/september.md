---
title: "SEPTEMBER"
subtitle: "Simulation-basEd Procedures To EstiMate BasE Rates"
date: 2021-01-01
authors:
  - "Reinoud Joosten"
  - "Abhishta Abhishta"
---

Covid-19 antibody tests used to identify whether an individual has been infected with SARS-CoV-2, can be employed to estimate the prevalence of this disease on a more aggregate or population level. If, for instance, such a test is taken among a number of Health Care Workers (HCW) in a well-specified region, then a sufficiently large sample suffices for a reasonably accurate estimation of the infection rate (proportion) among all HCWs in that region. The central ideas are that investigating a sample is quicker, cheaper and uses fewer scarce resources (e.g., the tests themselves) than investigating the entire population of interest. Moreover, the evolution in the rate can be monitored by taking samples distributed over time. The knowledge in the form of qualitatively sound estimates obtained may be relevant for policy decisions, for instance, in the case that a second wave is approaching, we may want to have an informed idea about the speed of the spreading of the virus as a crucial input for a second lockdown decision. Later on, we might want to have an idea about whether thresholds regarding the decline of the speed of spreading, or even the famed herd immunity, have been reached in order to end a lockdown.

The general public, and even medical professionals, may suffer from a series of misinterpretations when faced with test results (cf., e.g., Uffrage et al. [2000], Bar-Hillel [1980]), and debunking these requires insights from the rather counterintuitive field Bayesian statistics. To keep it simple, the proportion of people receiving a positive test result is not without reservations to be extrapolated to estimate the rate of the total population. To obtain reliable estimates regarding the prevalence the reliability (reliabilities) of a test must be taken into account as well.

We have designed a procedure based on Monte Carlo simulation to estimate rates and confidence intervals, and applied the procedure with success, albeit to experimental cases (cf., Joosten & Abhishta [2020]). The inputs for the MC simulation base procedure are quite simple, the test results need to be known, the sample size is required, and we need the reliability data regarding the test itself, and the procedure will provide several useful point estimators and a confidence interval of desired precision for the prevalence rate. Moreover, the confidence intervals can be used fruitfully to determine whether the sample size suffices, or should be increased for real world tests in order to enhance precision of the estimators. A documentation of this procedure and results of small scale tests can be found [here](href:https://doi.org/10.1101/2020.04.28.20075036).

The Monte Carlo simulation approach is quite robust to alternative assumptions and specifications regarding the reliability of the test. We are near completion of a paper on how to deal with stochasticity in the test reliabilities, as in real world situations numbers on test reliabilities derive from validations of the tests themselves. Hence, the reliability numbers provided by producers, governmental reviewing agencies (e.g., FDA in the USA or RIVM in the Netherlands) or others, are to be viewed as stochastic variables themselves, which have their own distributions, means and variances.

Our procedure and the estimators are still upheld, albeit that we have to add some layers of simulation in order to deal with the additional (but more realistic) assumptions regarding the stochasticity inherently contained in the test reliability numbers.

While deepening our knowledge regarding the topic of our research on behalf of our two papers mentioned, we discovered other items of interest regarding the nature of test reliabilities. Potential problems resulting from these peculiarities can presumably be tackled by means of our procedures or necessary, yet relatively minor adaptions of them. For the near future, we envision to be able to solve the problem of finding reliable estimators and confidence intervals for the situation that reliability numbers correlate systematically with the rate of prevalence of a disease.

Our, thus far limited, experiences show that the computational requirements for our Monte Carlo base procedure increase quite considerably in every step incorporating more realistic scenarios. We have thus far, provided our computer code for free on the internet as an online tool for practitioners to find estimators, confidence intervals and implicitly to determine sufficient bounds for their sample sizes. We noted a keen interest in some communities for the procedure, but our more extensive versions require more sophistication not only on our part but also on the side of the intended users.

To summarize our plans: we want to continue our investigations regarding the use of small-scale sampling for estimating population level prevalence rates of Covid-19 by means of Monte Carlo estimation-based procedures, and to assist practitioners and decision makers by providing our procedures as computational tools (almost) ready to use.

## References

Bar-Hillel, M, 1980, The base-rate fallacy in probability judgments, Acta Psychologica 44, 211-233.

Joosten, R & A Abhishta, 2020, A simulation-based procedure to estimate base rates from Covid-19 antibody test results I: Deterministic test reliabilities, Working paper University of Twente, MedRxiv 10.1101/2020.04.28.20075036.

Hoffrage U, S Lindsey, R Hertwig, G Gigerenzer, 2000, Medicine. Communicating statistical information, Science 290, 2261-2262, DOI: 10.1126/science.290.5500.2261.
