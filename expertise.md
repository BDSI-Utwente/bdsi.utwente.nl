---
title: Expertise Sharing
layout: single_page
bodyClass: page-list
note: AI-generated
accentColour: "#b4600b"
---

BDSi is dedicated to supporting researchers in harnessing the power of data science within the realm of social sciences. Through a range of initiatives including workshops, tutorials, events, and blog posts showing our work, we strive to create an environment where knowledge sharing is fun, engaging, and tailored to meet the unique needs of the BMS research community.

## Workshops and Tutorials
Our hands-on workshops and tutorials offer an interactive learning experience that goes beyond traditional teaching methods. We understand that each researcher has their own style of absorbing information, which is why we design our sessions to cater to diverse skill levels and backgrounds. By creating an environment where you can actively engage with peers and experts, ask burning questions, and receive personalized guidance, we ensure that the knowledge shared is not only relevant but also readily applicable to real-world scenarios in the social sciences.

{% assign events_future = site.events | sort: "date" | where_exp: "item", "item.date >= site.time" %}
{% assign events_past = site.events | sort: "date" | reverse | where_exp: "item", "item.date < site.time" %}

{% if events_future.size > 0 %}
### Upcoming workshops
{% for item in events_future %}
#### [{{item.title}}]({{site.baseurl}}{{item.url}})
{% include author-list.html page=item header_style="h6" %}

<h4 class="h6">{% include datetime.html page = item %}</h4>
{% endfor %}
{% endif %}


{% if events_past.size > 0 %}
### Previous workshops
{% for item in events_past limit:5 %}
#### [{{item.title}}]({{site.baseurl}}{{item.url}})
{% include author-list.html page=item header_style="h6" %}

<h4 class="h6">{% include datetime.html page = item %}</h4>
{% endfor %}
{% endif %}


<a href="{% link events.html %}" class="button center mb-6">All BDSi events</a>

## Community Events
We help organize events where researchers from various domains come together to discuss shared research interests. These community events provide a platform for networking, sharing ideas, and gaining valuable insights from experienced individuals who have made their mark in the field. We emphasize a diverse range of discussions that are meant to challenge conventions and inspire new research.

{% assign community_future_raw = site.data.calendar | where_exp: "item", "item.end >= site.time" | sort: "date" %}
{% assign community_past = site.data.calendar | where_exp: "item", "item.end < site.time" | sort: "date" | reverse %}

{% assign community_future = "" | split: "" %}


{% for item in community_future_raw %}
  {% assign title_lower = item.title | downcase %}
  
  {% if title_lower contains "bdsi open hour" %}{% continue %}{% endif %}
  {% if title_lower contains "bdsi walk-in hour" %}{% continue %}{% endif %}
  {% assign community_future = community_future | append: item %}

{% endfor %}

{% if community_future.length > 0 %}

### Upcoming events
{% for item in community_future %}
  {% assign item_url = item.url %}
  {% unless item_url %}
    {% for community in site.communities %}
        {% for keyword in community.keywords %}
            {% assign keyword_lower = keyword | downcase %}
            {% if title_lower contains keyword_lower %}
                {% capture item_url %}{% link {{ community.path }} %}{% endcapture %}  
            {% endif %}
        {% endfor %}
    {% endfor %}
  {% endunless %}
  
  {% if item_url %}
#### [{{item.title}}]({{item_url}})
  {% else %} 
#### {{item.title}}
{% endif %}

  {% include author-list.html page=item header_style="h6" %}
  <h4 class="h6">{% include datetime.html page = item %}</h4>

  {% assign count = count | plus: 1 %}
  {% if count > 5 %}{% break %}{% endif %}
{% endfor %}
{% endif %}

<a href="{% link community.html %}" class="button center mb-6">Data Science communities</a>

## Blog Posts
Not all our work is translatable to hands-on events, and not everyone can make it to our fantastic workshops. Our blog posts are meant to provide an overview of what Data Science can do for social science research, through real-world examples. We aim to provide concise, easy-to-follow materials that can both serve as interesting reading, as well as a step-by-step tutorial.

### Latest posts
{% assign items = site.blogs | sort: "date" | reverse %}
{% for item in items limit:5 %}

#### [{{item.title}}]({{site.baseurl}}{{item.url}})
{% include author-list.html page=item header_style="h6" %}
<h4 class="h6">{% include datetime.html page = item %}</h4>

{% endfor %}

<a href="{% link blogs.html %}" class="button center mb-6">All blog posts</a>