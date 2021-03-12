# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = { b: $(1) })]: 10 });
$(a)["b"] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = { b: $(1) })]: 10 });
$(a)['b'] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
const tmpCalleeParam = { [SSA_a]: 10 };
$(tmpCalleeParam);
const tmpAssignMemLhsObj = $(SSA_a);
tmpAssignMemLhsObj.b = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { '[object Object]': '10' }
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
