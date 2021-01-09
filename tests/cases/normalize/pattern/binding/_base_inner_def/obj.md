# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x = b } = 1;
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const x = tmpTernaryTest ? b : objPatternBeforeDefault;
`````

## Uniformed

`````js filename=intro
var x;
var x = 8;
var x = x.x;
x = x * x;
var x = x ? x : x;
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const objPatternBeforeDefault = (1).x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
tmpTernaryTest ? b : objPatternBeforeDefault;
`````
