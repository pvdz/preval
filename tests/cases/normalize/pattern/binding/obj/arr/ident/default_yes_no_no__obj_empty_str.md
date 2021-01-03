# Preval test case

# default_yes_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'pass'] } = { x: '', a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternObjRoot = { x: '', a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
$(y);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const bindingPatternObjRoot = { x: '', a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
$(y);
`````