# Preval test case

# default_no_no__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} } = { x: {}, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: {}, b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x;
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: {}, b: 11, c: 12 };
$('ok');
`````
