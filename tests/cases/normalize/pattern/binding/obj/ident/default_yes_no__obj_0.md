# Preval test case

# default_yes_no__obj_0.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('fail') } = { x: 0 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 0 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  x = objPatternBeforeDefault === undefined ? $('fail') : objPatternBeforeDefault;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 0 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  x = objPatternBeforeDefault === undefined ? $('fail') : objPatternBeforeDefault;
$(x);
`````
