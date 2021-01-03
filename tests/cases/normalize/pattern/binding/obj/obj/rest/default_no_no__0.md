# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternRest(objPatternNoDefault, []);
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````