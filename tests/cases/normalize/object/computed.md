# Preval test case

# computed.md

> Normalize > Object > Computed
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

## Pre Normal

`````js filename=intro
const obj = { [$(1)]: $(2) };
$(obj);
`````

## Normalized

`````js filename=intro
const tmpObjLitPropKey = $(1);
const tmpObjLitPropVal = $(2);
const obj = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(obj);
`````

## Output

`````js filename=intro
const tmpObjLitPropKey = $(1);
const tmpObjLitPropVal = $(2);
const obj = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(obj);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { 1: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
