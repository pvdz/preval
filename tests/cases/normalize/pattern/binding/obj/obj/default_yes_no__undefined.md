# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > obj > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'fail' }) } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined,
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ x: 'fail' }) : objPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````
