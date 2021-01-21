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

## Output

`````js filename=intro
var tmpComputedKey;
var tmpObjPropValue;
tmpComputedKey = $(1);
tmpObjPropValue = $(2);
const obj = { [tmpComputedKey]: tmpObjPropValue };
$(obj);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: {"1":2}
 - 3: undefined

Normalized calls: Same

Final output calls: Same
