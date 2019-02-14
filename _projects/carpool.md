---
layout: project_single
image_path: img/projects/carpool/carpool.jpg
category: University Project
title: Carpool Scheduler
csss:
  - slick
  - slick-theme
jss:
  - slick.min
images:
  - Login
  - Registration
  - Car Registration
  - Preferences Registration
  - Add Ride
  - Ride List
---

* Job: **{{page.category}}**
* Date : **Sep 2012 - May 2013**
* Technologies: **Genetic Algorithms, Client-Server Architecture, GoogleMaps API, Java, Android**
* Code: **<a href="https://bitbucket.org/GrimReaperSam/genetic-scheduler">https://bitbucket.org/GrimReaperSam/genetic-scheduler</a>**

---

This project aims to create a carpooling Android application with a server that automatically schedules the rides overnight. The project's goal is to group commuters sharing similar routes in order to reduce the usage of natural resources, decrease traffic and parking congestions, as well as vehicle emissions and pollution levels. This is also beneficial for the users themselves as it reduces their fuel and car maintenance costs.

The result was a client-server application in which the client was a user friendly Android application that allows users to specify their schedules and view their respective rides and drivers after the scheduler has assigned the routes. The server consisted of a **Genetic Algorithm (GA)** that receives user requests and runs overnight, it makes use of Google Maps to calculate a fair and efficient route for all the users and sends back the results. The calculation took into account the users origin and destination, as well as their departure and arrival time windows. It also accounted for fairness, which means rotating drivers over the week so that everybody gets to be a passenger sometime. The algorithm was similarly able to include user preferences such as smoking, age range, and preferred car capacity.

The project was successful and resulted in two publications {% cite dakroub2013intelligent boukhater2014intelligent %} as well as gaining the best poster award at the American University of Beirut FEA Student and Alumni Conference, year 2013.

Below are some images from the Android user application.

<div id="slick-carousel" class="margBSmall">
  {% for image in page.images %}
  <div>
    <img src="{{base}}/img/projects/carpool/{{image}}.jpg" alt="Login" class="img-responsive center-block">
    <div class="slick-caption">
      <h2>{{image}}</h2>
    </div>
  </div>
  {% endfor %}
</div>

**References**
{% bibliography --cited %}

<script>
  $('#slick-carousel').slick();
</script>
