# Preval test case

# default_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('pass') } = { b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { b: 2, c: 3 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  x = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { b: 2, c: 3 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  x = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(x);
`````
