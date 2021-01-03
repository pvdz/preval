# Preval test case

# default_no_no_no__null.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = null.x;
$('bad');
`````