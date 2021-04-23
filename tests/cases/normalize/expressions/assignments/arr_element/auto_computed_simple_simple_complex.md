# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + (a = { b: $(1) }));
a["b"] = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + (a = { b: $(1) }));
a['b'] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothLhs = a;
const tmpObjLitVal$1 = $(1);
a = { b: tmpObjLitVal$1 };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
const tmpObjLitVal$1 = $(1);
const tmpSSA_a = { b: tmpObjLitVal$1 };
const tmpCalleeParam = a + tmpSSA_a;
$(tmpCalleeParam);
const tmpAssignMemRhs = $(2);
tmpSSA_a.b = tmpAssignMemRhs;
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '[object Object][object Object]'
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
