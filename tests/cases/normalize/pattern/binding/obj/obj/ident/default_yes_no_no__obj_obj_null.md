# Preval test case

# default_yes_no_no__obj_obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternBeforeDefault = objPatternNoDefault.y,
  y = objPatternBeforeDefault === undefined ? $('fail') : objPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternBeforeDefault = objPatternNoDefault.y,
  y = objPatternBeforeDefault === undefined ? $('fail') : objPatternBeforeDefault;
$(y);
`````
