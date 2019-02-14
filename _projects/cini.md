---
layout: project_single
image_path: img/projects/cini/cini.jpg
category: University Project
title: Digitizing archived paintings
---

* Job: **{{page.category}}**
* Date : **Feb 2016 - May 2016**
* Technologies: **Python, Anaconda, OpenCV, Image Processing, Layout analysis, Optical Character Recognition**
* Code: **<a href="https://github.com/GrimReaperSam/Cini-OCR">https://github.com/GrimReaperSam/Cini-OCR</a>**

---

The **[Giorgio Cini Foundation](http://www.cini.it/en/foundation)** is a non-profit cultural instituation located in Venice, Italy.
It aims to create a cultural center in the Island of San Giorgio Maggiore. As part of this goal,
I worked on a semester project at EPFL (**[DHLAB](http://dhlab.epfl.ch)**) to automate the digitiation of a large dataset of painting photos.
The scans, front and back shown below, need be processed and then associated with their paintings and textual description.
The final pipeline takes as input the front and back scans, and returns the bounding boxes
of the painting, the text area and the barcode. It also recognizes each text section individually as well
as their textual information using OCR.

![Front]({{base}}/img/projects/cini/front.png "Front")
{: .margBMSSSmall}
# **Recto scan**
{: .text-center .margBSmall}

Using different morphology operators, gradients, and OTSU thresholding completed by some dimension and position constraints, the painting and
text boxes were identified and cropped from the image and re-aligned. The painting is identified as the largest cluster remaining after processing the image,
while the text area is found by taking the lowest horizontal using Hough Transform line that's above the painting box. The results from the previous image are shown below.

![Painting]({{base}}/img/projects/cini/painting.png "Painting")
{: .margBMSSSmall}
# **Painting**
{: .text-center .margBSmall}

![Text Area]({{base}}/img/projects/cini/text-area.png "Text Area")
{: .margBMSSSmall}
# **Text Area**
{: .text-center .margBSmall}

From there, the text area is taken and processed using a layout analysis tool: **[Kraken](https://github.com/mittagessen/kraken)**. It tries to find the smallest
bounding boxes in an image giving a result like this:

![Text Location]({{base}}/img/projects/cini/text-location.png "Text Location")
{: .margBMSSSmall}
# **Text Location**
{: .text-center .margBSmall}

Text text area is also processed using Frangi Filters, which are able to find ridges in the image, allowing to find thing edges separating similar regions in it.
The result is an image segmentation separating all the parts of the text area as follows:

![Layout Analysis]({{base}}/img/projects/cini/layout-analysis.png "Layout Analysis")
{: .margBMSSSmall}
# **Layout Analysis**
{: .text-center .margBSmall}

The results from both methods are merged together, and sorted vertically and horizontally in order to classify each area. For example the top-left most area
is the City in which the painting can be found. The end result of the process is something like this:

![Text Classification]({{base}}/img/projects/cini/text-classification.png "Text Classification")
{: .margBMSSSmall}
# **Text Classification**
{: .text-center .margBSmall}

After that each identified section is cropped and parsed using **[Tesseract OCR](https://github.com/tesseract-ocr/tesseract)**, and the results are stored in a json
file as a set of keys and values for this image, giving a result similar to the below structure:

``` json
"City" : "COLONIA",
"Author": "GIOVANNI FRANCESCO da RIMINI (attr.)",
"Attribution": "FONDO G. FIOCCO",
"Museum": "MUSEO DIOCESANO", ...
```
