# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

See https://pvdz.ee/weblog/438 on discussions on transforming this

## Input

`````js filename=intro
const [ x ] = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = [...x];
var x = x[8];
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
arrPatternSplat[0];
`````
