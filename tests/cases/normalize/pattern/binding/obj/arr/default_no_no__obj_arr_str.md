# Preval test case

# default_no_no__obj_arr_str.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = { x: ['abc'], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: ['abc'], a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: ['abc'], a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
$('ok');
`````
