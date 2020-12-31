# Preval test case

# default_yes_no_no__obj_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: 'abc', b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 'abc', b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternBeforeDefault = objPatternNoDefault.y,
  y = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 'abc', b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternBeforeDefault = objPatternNoDefault.y,
  y = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(y);
`````
