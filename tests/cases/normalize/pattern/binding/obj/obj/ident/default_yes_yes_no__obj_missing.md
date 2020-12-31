# Preval test case

# default_yes_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'pass2' }) } = { b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'pass2' }) : objPatternBeforeDefault,
  objPatternBeforeDefault_1 = objPatternAfterDefault.y,
  y = objPatternBeforeDefault_1 === undefined ? $('fail') : objPatternBeforeDefault_1;
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'pass2' }) : objPatternBeforeDefault,
  objPatternBeforeDefault_1 = objPatternAfterDefault.y,
  y = objPatternBeforeDefault_1 === undefined ? $('fail') : objPatternBeforeDefault_1;
$(y);
`````
