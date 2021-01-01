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

## Output

`````js filename=intro
var tmpTernaryTest;
const objPatternNoDefault = (1).x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault_1.z;
tmpTernaryTest = objPatternBeforeDefault === undefined;
`````
