# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = { x: undefined, a: 11, b: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = { x: x, x: 8, x: 8 };
var x = x.x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
[...objPatternNoDefault];
$('bad');
`````
