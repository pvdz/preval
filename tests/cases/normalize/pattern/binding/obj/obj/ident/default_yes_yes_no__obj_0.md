# Preval test case

# default_yes_yes_no__obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: 0, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'fail2' }) : objPatternBeforeDefault,
  objPatternBeforeDefault_1 = objPatternAfterDefault.y,
  y = objPatternBeforeDefault_1 === undefined ? $('pass') : objPatternBeforeDefault_1;
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'fail2' }) : objPatternBeforeDefault,
  objPatternBeforeDefault_1 = objPatternAfterDefault.y,
  y = objPatternBeforeDefault_1 === undefined ? $('pass') : objPatternBeforeDefault_1;
$(y);
`````
