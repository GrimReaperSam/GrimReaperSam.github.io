---
layout: project_single
image_path: img/projects/taipei/taipei.jpg
category: University Project
title: Taipei Land Use
---

* Job: **{{page.category}}**
* Date : **April 2018 - June 2018**
* Technologies: **Python, Anaconda, QGIS, Image Processing, Data mining, Javascript, ArcGIS, GDrive API, GeoJSON, OCR**
* Code: **<a href="https://github.com/GrimReaperSam/TaipeiLandUse">https://github.com/GrimReaperSam/TaipeiLandUse</a>**

---

For many growing or developed cities, justice for housing is a serious issue. Unaffordable house prices are a pain for the young generation. Moreover, real estate speculation and urban renewal sometimes worsen the situation. Our project takes Taipei as a case study, trying to discover the city's land use with the help of satellite imagery and data released by the government.

We collect urban renewal data, and analyze the change of surroundings before and after the renewal such as land price, and environmental factors. We also analyze the relationship between renewed areas and illegal rooftops - the assumption is that these illegal rooftops represent houses for rental.

In the end, we build a platform to allow users to explore the evolution of the city and the land use. The user can understand the advantages and disadvantages a renewal can bring by comparing its surrounding between different years. In the end, we want to have an interactive way to demonstrate the gentrification in the city, showing how it affects people’s everyday lives.


![Screenshot]({{base}}/img/projects/taipei/comp.png "Screenshot")
{: .margBMSSSmall}
# **Screenshot**
{: .text-center .margBSmall}

This project is based on data collection, analysis and usage of historical maps and renewal land information in Taipei. The technical work is split into four parts. Obtaining the historical map models, collecting land renewal data, data analysis using QGIS and user interface with ArcGIS JS API. This data was not localized in one source and as such we had to devise different methods to obtain it. 

For the illegal rooftops, we obtained one CSV and one PDF file. We were able to easily parse them and collect the coordinates (lat, lon) of every illegal structure in these documents. This resource has no date accompanying it, they are all assumed to predate any other resources we have and have remained until their date of declaration. In total we had 435 illegal structure locations.

The renewal lands information was spread across multiple scanned PDFs. Each renewal area had its own file and they were organized by districts. We chose to limit ourselves to data coming after 2012 since the land numbering system has changed in Taipei. For each PDF we used google's OCR to obtain the land numbers we are interested in, and reviewed them manually to fix any mistakes. In total we were able to obtain 330 renewal areas. In order to work with these areas, we translated them into GeoJSON using the previously mentioned land number to GeoJSON API.

The land prices were provided for every year since 2013 in CSV format, however they were for all the numbers in Taipei. We only kept the ones relevant to us by checking the correspondence with the numbers from the renewal areas.
