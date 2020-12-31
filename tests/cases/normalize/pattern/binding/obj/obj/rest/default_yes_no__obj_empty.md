# Preval test case

# default_yes_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'pass' }) } = {};
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = {},
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ a: 'pass' }) : objPatternBeforeDefault,
  y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = {},
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ a: 'pass' }) : objPatternBeforeDefault,
  y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````
