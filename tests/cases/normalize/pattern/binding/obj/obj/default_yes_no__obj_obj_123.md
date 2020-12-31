# Preval test case

# default_yes_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'fail' }) } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ x: 'fail' }) : objPatternBeforeDefault;
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x;
$('ok');
`````
