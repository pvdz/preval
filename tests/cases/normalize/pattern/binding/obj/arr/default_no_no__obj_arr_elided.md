# Preval test case

# default_no_no__obj_arr_elided.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = { x: [, , , 1], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: [, , , 1], a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: [, , , 1], a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x;
$('ok');
`````
