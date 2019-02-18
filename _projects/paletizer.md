---
layout: project_single
image_path: img/projects/paletizer/paletizer.png
category: University Project
title: Paletizer - Color Transfer
---

* Job: **{{page.category}}**
* Date : **April 2016 - June 2016**
* Technologies: **Python, Anaconda, Image Processing, OpenCV, Data Mining, Java, Andoid, PHP, Surveys**
* Code: **<a href="https://github.com/GrimReaperSam/team-palette">https://github.com/GrimReaperSam/team-palette</a> and <a href="https://github.com/EtienneFerrier/Java_palette_database">https://github.com/EtienneFerrier/Java_palette_database</a>**
* Demo: **<a href="https://www.youtube.com/watch?v=MPLKD5c_vvc">https://www.youtube.com/watch?v=MPLKD5c_vvc</a>**

---

The goal of this project is to develop an Android application for color transfer. We develop three color transfer methods, a color palette database, and an Android application.

Color Transfer
==============

The statistical properties of an image contain good information about its look and feel. In the first method, we leverage these properties and move the statistical mean and std of a source image onto a target image.

![Statistical color transfer]({{base}}/img/projects/paletizer/reinhard.png "Statistical color transfer")
{: .text-center .margBMSSSmall}
# **Statistical Color Transfer**
{: .text-center .margBSmall}

Furthermore, we can extract color palettes from images using k-means with a deterministic approach for center initialization. The approach is based on image histograms in LAB space. We consecutively select the color representing the largest bin, and decrease all other bins based on their distance to the chosen color. We repeat this until we get k centers, and add a final fixed black center to account for dark colors in the image.

![Home]({{base}}/img/projects/paletizer/home-palette.jpg "Home"){:style="max-height:200px;width:330px"} ![Moon]({{base}}/img/projects/paletizer/moon-palette.jpg "Moon"){:style="max-height:200px;width:330px"}
{: .text-center .margBMSSSmall}
# **Palette Extraction k=5**
{: .text-center .margBSmall}

Using the palette extraction method, we design the second and third color transfer methods that map the images colors to make its palette match the desired colors. In the second method, we use histogram matching to ensure the target image colors match the source colors.

![Histogram color transfer]({{base}}/img/projects/paletizer/histogram.png "Histogram color transfer")
{: .text-center .margBMSSSmall}
# **Histogram Color Transfer**
{: .text-center .margBSmall}

In the above, the color are a bit unnatural due to out of gamut colors, clipping, and loss of dynamic range. In the third method, we enforce color constraints on the target based on the palette, the gamut, the luminance and the dynamic range. The better results come at a higher computational cost.


![Vector color transfer]({{base}}/img/projects/paletizer/vector.png "Vector color transfer")
{: .text-center .margBMSSSmall}
# **Vector Color Transfer**
{: .text-center .margBSmall}

Palette Database
================

We use [Adobe Kuler](https://color.adobe.com) to mine the 1000 most popular palettes. For each user query, we compute the semantic similarity of each palette name to the given keyword, and return the highest similarity matches. A Java implementation is available on [Github](https://github.com/EtienneFerrier/Java_palette_database). Additionally, we mine Flickr for images matching the keyword and extract palettes from there as well.


Android App
===========

After prototyping the algorithms in Python and Matlab, we moved the code to Android using a Java wrapper of OpenCV. We chose not to implement the last color transfer method due to its computational costs. The user is able to input an image and choose either another image as a source, or look for a palette using our database search utilities. Below are some screenshots from the app, and you can find a demo on [Youtube](https://www.youtube.com/watch?v=MPLKD5c_vvc).

![App Screenshots]({{base}}/img/projects/paletizer/android.png "App Screenshots")
{: .text-center .margBMSSSmall}
# **App Screenshots**
{: .text-center .margBSmall}
