# Preval test case

# default_no_no__obj_123.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = { x: 1, a: 2, b: 3 };
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 1, a: 2, b: 3 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 1, a: 2, b: 3 };
const objPatternNoDefault = bindingPatternObjRoot.x;
[...objPatternNoDefault];
$('bad');
`````

## Result

Should call `$` with:
['<crash[ undefined is not a function ]>'];

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

