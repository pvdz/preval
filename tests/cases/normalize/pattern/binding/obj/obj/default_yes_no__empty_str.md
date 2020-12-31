# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > obj > obj > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'pass' }) } = '';
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = '',
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ x: 'pass' }) : objPatternBeforeDefault;
$('ok');
`````

## Output

`````js filename=intro
$('ok');
`````
