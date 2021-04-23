# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Let > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = { b: $(1) });
$(xyz);
$(a)["b"] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = { b: $(1) });
$(xyz);
$(a)['b'] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let xyz = a;
$(xyz);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(a);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
