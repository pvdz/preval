# Preval test case

# do_while.md

> normalize > blocks > do_while
>
> Add blocks to sub-statements

## Input

`````js filename=intro
do $(1);
while ($(2));
`````

## Normalized

`````js filename=intro
var ifTestTmp;
do {
  $(1);
  ifTestTmp = $(2);
} while (ifTestTmp);
`````

## Uniformed

`````js filename=intro
var x;
do {
  x(8);
  x = x(8);
} while (x);
`````

## Output

`````js filename=intro
var ifTestTmp;
do {
  $(1);
  ifTestTmp = $(2);
} while (ifTestTmp);
`````
