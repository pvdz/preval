# Preval test case

# default_yes_no__obj_0.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'fail' }) } = { x: 0, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ x: 'fail' }) : objPatternBeforeDefault;
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x;
$('ok');
`````
