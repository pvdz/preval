# Preval test case

# default_no_no__obj_missing.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = { a: 11, b: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
[...objPatternNoDefault];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
