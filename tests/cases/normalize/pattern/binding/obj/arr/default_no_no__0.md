# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > arr > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
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
const objPatternNoDefault = (0).x;
[...objPatternNoDefault];
$('bad');
`````
