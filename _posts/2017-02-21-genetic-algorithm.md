---
layout: post_single
title: Genetic Algorithms
excerpt_separator: <!--more-->
tags:
  - genetic algorithm
  - artificial intelligence
  - draft
jss:
  - underscore-min
  - d3.v4.min
  - chromosome
  - posts/genetic algorithm/ga
---
<div class="post-media margBSmall" markdown="1">
  <img class="img-responsive center-block" src="{{base}}/img/blog/genetic algorithm/main-image.jpg"/>
</div>

A genetic algorithm (GA) aims at solving optimization problems based on a natural selection process that behaves similarly to biological evolution. The algorithm repeatedly alters a population of individual solutions and randomly selects individuals from the current generation to produce the children for the next generation. This random process leads to the solution after multiple "evolution" rounds.

Natural selection is a survival process that describes how organisms that are better adapted to their environment tend to survive and produce more offspring than the other organisms. Each section will explain how each biological aspect of natural selection is mirrored in a genetic algorithm. The explanation will also follow an example where the GA will try to find the famous "Hello World!" text.

<!--more-->

# **Chromosomes and Fitness**

In natural selection, the individual's survival relies on his characteristics that are embedded in his chromosomes. A population will have multiple individuals, thus multiple different chromosomes corresponding to the same attribute. Similarly, our GA will have a population which an ensemble of chromosomes encoding the solution. In our example, we are trying to produce the string "Hello World!", so each chromosome will be simply a string of matching length but with different characters. You can see below an example of a population of 4 individuals that are candidates to be solutions to our problem. This population is randomly generated, and if by any chance there are matching characters already, they are highlighted with a green background. The population will undergo multiple evolutions, while keeping the most suitable individuals at each step in order to reach the goal after several generations.

<div id="population-example"></div>
**4 chromosomes population**
{: .text-center}

As we said previously, natural selection tenders to those who are better adapted to survive, which is called fitness. Similarly, in a GA the goal can be formulated as a fitness function which calculates how close we are to the goal. In our example the fitness function can be simply the amount of letters that match "Hello World!" for each individual. This chromosome has a fitness of 5 for example because it has 5 matching letters.

<div id="matching-five-example"></div>
**Chromosome with 5 matches**
{: .text-center}

This fitness function is a good starting point, however it doesn't take into account how close each candidate character is to the goal character. This means "Hello Worle!" and "Hello Worly!" have the same score, but the first one is actually closer because the letter "e" is closer to "d" than "y". To account for that, we increase the fitness as we get warmer. There are 127 ASCII characters, so this is the maximum distance and thus can be used as default fitness if the characters are matching and decreased by their distance in the latter case. The complete fitness for a character can be calculated as:

$$ \mathscr{F}_c = 1_{c==g} + \frac{(127 - d_{c,g})}{127}$$

where $$ c $$ is the chromosome character, $$ g $$ is the corresponding goal character and $$ d_{c, g} $$ the distance between them.

Applying this formula to the chromosome with five matches and summing over all characters, we get a fitness of <span id="matching-five-fitness"></span>. Similarly, "Hello Worle!" has a fitness of <span id="worle-fitness"></span>, while "Hello Worly!" fitness is <span id="worly-fitness"></span>, showing indicating which one is closer to the solution. The maximum possible fitness is 24.

# **Evolving with Operators**
