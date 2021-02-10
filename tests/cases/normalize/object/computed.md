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
const tmpObjLitPropKey = $(1);
const tmpObjLitPropVal = $(2);
const obj = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(obj);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { 1: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
