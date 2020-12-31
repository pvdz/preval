# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > obj > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined,
  objPatternNoDefault = bindingPatternObjRoot.x;
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````
