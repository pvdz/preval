# Preval test case

# base.md

> normalize > pattern >  > param > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
let x
(x = 1);
$(x);
`````

## Normalized

`````js filename=intro
let x;
x = 1;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
x = 8;
x(x);
`````

## Output

`````js filename=intro
let x;
x = 1;
$(x);
`````
