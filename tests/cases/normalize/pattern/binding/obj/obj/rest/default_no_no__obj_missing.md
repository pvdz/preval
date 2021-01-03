# Preval test case

# default_no_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = { b: 11, c: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternRest(objPatternNoDefault, []);
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
$('bad');
`````