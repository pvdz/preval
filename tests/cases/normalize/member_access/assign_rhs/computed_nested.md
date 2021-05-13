# Preval test case

# computed_nested.md

> Normalize > Member access > Assign rhs > Computed nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
let x = 10;
x = obj['a'].b;
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: $() } };
let x = 10;
x = obj['a'].b;
$(x);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let x = 10;
const tmpAssignRhsProp = obj.a;
x = tmpAssignRhsProp.b;
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $();
$(tmpObjLitVal$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
