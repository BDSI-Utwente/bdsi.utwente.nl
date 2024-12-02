---
title: Data Science Grant Q4 2023 - Winners
authors:
 - Anna Machens
 - Karel Kroeze
frontpage: true
image: "/assets/images/news/UTIMG40941_00b4b.jpg"
tags: [data science grant, data science grant 2023, winners]
date: 2024-01-03
---

The BDSi Data Science Grants are decided twice yearly, generally at the end of Q2 and Q4. The grants are open for all BMS faculty that are looking to include data science in their research or education. We take on a limited number of high-impact projects, often creating a proof-of-concept for further research and grant applications. 

From the proposals for Q42023, we selected 4 very impactful and innovative proposals that we are looking forward to support. Two with full support in Q1 2024 and two which will be started as a limited pilot with potential extensions into Q3. We’re excited about starting these new projects, and look forward to collaborating with the great teams behind them.

<a class="button" href="/data-science-grant">More information</a>

## Winning proposals
It was our pleasure to inform the winning applicants just before the holidays, and we are now ready to announce the results to the BDSi community. So, without further ado, here are the winning proposals.

{% assign _projects = site.projects | where_exp: "project", "project.tags contains 'data science grant 2023'" | sort: "project.title" %}
{% for project in _projects %}
{% assign contributors=project.authors | slice: 1, 99 %}

### [{{project.title}}]({{site.baseUrl}}{{project.url}})
{% if project.subtitle %}##### {{project.subtitle}}{% endif %}
{% include author-list.html authors=project.authors.first header="h4" %}
{% include author-list.html authors=contributors header="h6" %}
{{project.introduction}}

<a class="button" href="{{site.baseUrl}}{{project.url}}">Read more</a>
{% endfor %}
