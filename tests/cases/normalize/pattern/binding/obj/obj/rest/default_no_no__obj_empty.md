# Preval test case

# default_no_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = {};
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = {},
  objPatternNoDefault = bindingPatternObjRoot.x,
  y = objPatternRest(objPatternNoDefault, []);
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = {},
  objPatternNoDefault = bindingPatternObjRoot.x;
$('bad');
`````
