---
title: "Linear method apps using interactive visualization (Shiny Apps)"
author: "Sam"
frontpage: true
image: "to update"
---

In the latest bookdown edition of the textbook titled [**Analysing Data using Linear Models**](https://bookdown.org/pingapang9/linear_models_bookdown/) by Stéphanie M. van den Berg, we make use of Shiny apps to explain fundamental concepts in statistics and linear models in an interactive manner. The apps are integrated directly into the online textbook, making it accessible for both students and teachers.

In this article, we introduce functionalities of four apps: normal distribution, z-distribution, correlation, and intra-correlation. They are designed to suit the needs of users in different roles, such as students and teachers.


### [Normal distribution App](https://bdsi.shinyapps.io/linear-models-book__normal-distribution/)

This app is used in [**Section 1.19, The normal distribution**](https://bookdown.org/pingapang9/linear_models_bookdown/intro.html#sec:normal) of the book:
<iframe width="100%" height="400px" src="https://bdsi.shinyapps.io/linear-models-book__normal-distribution/"> </iframe>

With normal distribution app, users can observe the interactive change in the shape of normal distribution when they adjusts two parameters: the mean, and the standard deviation. The default display of the app is standard normal distribution (mean = 0, std = 1), which can be reset. Thus, users can compare the change to the default setting.

### [z distribution App](https://bdsi.shinyapps.io/linear-models-book__z-distribution/)

z-distribution apps offeres users more flexibility with three modes, namely, critical values, p-values, and combined. Users can select the mode by adding `?mode=critical_values` , `?mode=p_values` , or `?mode=combined` to the app’s URL.

In the online textbook, the mode `critical_values` is used in [**Section 3.4: Null hypothesis concerning a proportion**](https://bookdown.org/pingapang9/linear_models_bookdown/prop.html#null-hypothesis-concerning-a-proportion). Accordingly, readers (i.e. students) can only change the type I error of the two-sided hypothesis testing. The corresponding change in the critical z values to reject the null-hypothesis for a proportion, and p-values are reflected in the figure.

Switching to mode `p_values` allows users to calculate p-value of the two-sided hypothesis test given the z-values and vice versa.

<iframe width="100%" height="400px" src="https://bdsi.shinyapps.io/linear-models-book__z-distribution/?mode=p_values"> </iframe>

For the full illustration, users can select “combined” mode to play around with different settings in type I error, z-values, and p-values.

<iframe width="100%" height="600px" src="https://bdsi.shinyapps.io/linear-models-book__z-distribution/?mode=combined"> </iframe>

### [Correlation App](https://bdsi.shinyapps.io/linear-models-book__correlation/)

Like previous apps, we design two modes for the correlation app: show linear fit (`?mode = linear`), or not (`?mode = null`, default mode). 

In [**section 4.8 Pearson correlation**](https://bookdown.org/pingapang9/linear_models_bookdown/simple.html#pearson-correlation) of the book, the embedded app shows the default mode. Readers can only interact by changing the value of Pearson correlation from 0 to 1. When the correlation is 1, the dots are on a perfect straight line; when the correlation is 0, there is complete randomness.

If users select mode `linear`, they can see the "show linear fit" checkbox as below. 

<iframe width="100%" height="400px" src="https://bdsi.shinyapps.io/linear-models-book__correlation/?mode=linear"> </iframe> 

### [Intra-class correlation App](https://bdsi.shinyapps.io/linear-models-book__intra-class-correlation/)

The intra-class correlation app also has two modes: `light` and `full`. The version embedded in [**Section 13.1 - Pre-mid-post intervention designs**](https://bookdown.org/pingapang9/linear_models_bookdown/premidpost.html#pre-mid-post-intervention-designs) uses `light` mode to visualize the influence of high ICC values on the residual plots. The residuals plots in two panels are different due to whether patient variable is included in the linear model (the right panel) or not (the left panel). 

With `full` mode, users can change the number of respondents and/or number of measurements in addition to the value of intraclass correlation.
<iframe width="100%" height=400px" src="https://bdsi.shinyapps.io/linear-models-book__correlation/?mode=full"> </iframe>
