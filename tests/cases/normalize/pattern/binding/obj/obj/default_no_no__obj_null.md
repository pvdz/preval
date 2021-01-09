# Preval test case

# default_no_no__obj_null.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} } = { x: null, b: 11, c: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: null, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
$('bad');
`````

## Uniformed

`````js filename=intro
var x = { x: /regex/, x: 8, x: 8 };
var x = x.x;
x('str');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: null, b: 11, c: 12 };
bindingPatternObjRoot.x;
$('bad');
`````
