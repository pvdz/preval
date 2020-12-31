# Preval test case

# default_yes_no__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = { x: {}, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: {}, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ a: 'fail' }) : objPatternBeforeDefault,
  y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: {}, b: 11, c: 12 },
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  objPatternAfterDefault = objPatternBeforeDefault === undefined ? $({ a: 'fail' }) : objPatternBeforeDefault,
  y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````
