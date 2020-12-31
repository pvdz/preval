# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'pass2' }) } = 'abc';
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 'abc',
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'pass2' }) : objPatternBeforeDefault,
  objPatternBeforeDefault_1 = objPatternAfterDefault.y,
  y = objPatternBeforeDefault_1 === undefined ? $('fail') : objPatternBeforeDefault_1;
$(y);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = 'abc'.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'pass2' }) : objPatternBeforeDefault,
  objPatternBeforeDefault_1 = objPatternAfterDefault.y,
  y = objPatternBeforeDefault_1 === undefined ? $('fail') : objPatternBeforeDefault_1;
$(y);
`````
