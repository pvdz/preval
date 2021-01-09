# Preval test case

# computed.md

> normalize > object > computed
>
> Computed keys

#TODO

## Input

`````js filename=intro
const obj = {
  [$(1)]: $(2),
};
$(obj);
`````

## Normalized

`````js filename=intro
var tmpComputedKey;
var tmpObjPropValue;
tmpComputedKey = $(1);
tmpObjPropValue = $(2);
const obj = { [tmpComputedKey]: tmpObjPropValue };
$(obj);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x(8);
x = x(8);
var x = { [x]: x };
x(x);
`````

## Output

`````js filename=intro
var tmpComputedKey;
var tmpObjPropValue;
tmpComputedKey = $(1);
tmpObjPropValue = $(2);
const obj = { [tmpComputedKey]: tmpObjPropValue };
$(obj);
`````
