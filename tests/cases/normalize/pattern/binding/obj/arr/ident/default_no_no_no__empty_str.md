# Preval test case

# default_no_no_no__empty_str.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = '';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = '';
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = 'str';
var x = x.x;
var x = [...x];
var x = x[8];
x('str');
`````

## Output

`````js filename=intro
const objPatternNoDefault = ''.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
$('bad');
`````
