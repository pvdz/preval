# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > obj > arr > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = x.x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
[...objPatternNoDefault];
$('bad');
`````
