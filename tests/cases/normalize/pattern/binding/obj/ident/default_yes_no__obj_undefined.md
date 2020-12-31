# Preval test case

# default_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('pass') } = { x: undefined };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: undefined },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  x = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: undefined },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  x = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$(x);
`````
