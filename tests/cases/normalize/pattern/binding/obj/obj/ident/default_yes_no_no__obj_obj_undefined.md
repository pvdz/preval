# Preval test case

# default_yes_no_no__obj_obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternBeforeDefault = objPatternNoDefault.y,
  y = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternBeforeDefault = objPatternNoDefault.y,
  y = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(y);
`````
