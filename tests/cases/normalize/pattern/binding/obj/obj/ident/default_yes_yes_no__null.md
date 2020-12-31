# Preval test case

# default_yes_yes_no__null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null,
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'fail2' }) : objPatternBeforeDefault,
  objPatternBeforeDefault_1 = objPatternAfterDefault.y,
  y = objPatternBeforeDefault_1 === undefined ? $('fail') : objPatternBeforeDefault_1;
$('bad');
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = null.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ y: 'fail2' }) : objPatternBeforeDefault;
$('bad');
`````
