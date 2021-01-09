# Preval test case

# default_no_no_no__null.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y } } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null;
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternNoDefault.y;
$('bad');
`````

## Uniformed

`````js filename=intro
var x = /regex/;
var x = x.x;
var x = x.x;
x('str');
`````

## Output

`````js filename=intro
const objPatternNoDefault = null.x;
objPatternNoDefault.y;
$('bad');
`````
