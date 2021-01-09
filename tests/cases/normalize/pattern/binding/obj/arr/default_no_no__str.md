# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > obj > arr > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = 'abc';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 'abc';
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = 'str';
var x = x.x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
const objPatternNoDefault = 'abc'.x;
[...objPatternNoDefault];
$('bad');
`````
