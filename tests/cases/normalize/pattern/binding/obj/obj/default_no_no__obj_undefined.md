# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} } = { x: undefined, b: 11, c: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
$('bad');
`````
