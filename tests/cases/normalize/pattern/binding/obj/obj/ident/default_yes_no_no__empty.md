# Preval test case

# default_yes_no_no__empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1,
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternBeforeDefault = objPatternNoDefault.y,
  y = objPatternBeforeDefault === undefined ? $('fail') : objPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
$('bad');
`````
