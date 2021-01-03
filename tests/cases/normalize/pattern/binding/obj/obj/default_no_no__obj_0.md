# Preval test case

# default_no_no__obj_0.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} } = { x: 0, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
bindingPatternObjRoot.x;
$('ok');
`````
