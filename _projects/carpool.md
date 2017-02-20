---
layout: project_single
image_path: img/projects/carpool.jpg
category: University Project
title: Carpool Scheduler
published: false
---

* Job: **{{page.category}}**
* Date : **Sep 2012 - May 2013**
* Technologies: **Genetic Algorithms, Client-Server Architecture, GoogleMaps API, Java, Android**

---

This project aims to create a carpooling Android application with a server that automatically schedules the rides overnight. The project's goal is to group commuters sharing similar routes in order to reduce the usage of natural resources, decrease traffic and parking congestions, as well as vehicle emissions and pollution levels. This is also beneficial for the users themselves as it reduces their fuel and car maintenance costs.

The result was a client-server application in which the client was a user friendly Android application that allows users to specify their schedules and view their respective rides and drivers after the scheduler has assigned the routes. The server consisted of a **Genetic Algorithm (GA)** that receives user requests and runs overnight, it makes use of Google Maps to calculate a fair and efficient route for all the users and sends back the results.

A **Genetic Algorithm (GA)** is a method for solving optimization problems by selecting the best solutions. The selection is based on processes that mimic biological evolutions. The algorithm repeatedly evolves a population of solutions and preserves the best ones for the next generation. We used a modified version of GA in which the solution is the set of all the rides in the system, while each chromosome represented a single ride. The rides consisted of a driver and a set of users that met the capacity constraint of the driver's car and can be seen in the example chromosome below.

<div id="ride-example" class="margBSSmall"></div>

Each solution is then represented by a set of chromosomes corresponding to all the rides of the system, and was evaluated according to the sum of its chromosomes' values. A system with 12 users could for example be solved using three cars with the riders dispersed like this.

<div id="solution-example" class="margBSSmall"></div>



<script src="{{base}}/js/chromosome.js" type="text/javascript"></script>
<script>{% include js/carpool_project.js %}</script>
