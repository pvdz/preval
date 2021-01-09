# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z = a }}} = 1;
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault_1.z;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const z = tmpTernaryTest ? a : objPatternBeforeDefault;
`````

## Uniformed

`````js filename=intro
var x;
var x = 8;
var x = x.x;
var x = x.x;
var x = x.x;
x = x * x;
var x = x ? x : x;
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const objPatternNoDefault = (1).x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault_1.z;
tmpTernaryTest = objPatternBeforeDefault === undefined;
tmpTernaryTest ? a : objPatternBeforeDefault;
`````
