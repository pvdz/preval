# Preval test case

# auto_seq_simple_computed_simple.md

> Normalize > Expressions > Assignments > Compound > Auto seq simple computed simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
($(1), a)["b"] = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
($(1), a)[`b`] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpObjLitVal = $(1);
const tmpBinBothRhs = { b: tmpObjLitVal };
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpBinBothRhs = { b: tmpObjLitVal };
const tmpClusterSSA_a = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(1);
const tmpAssignMemRhs = $(2);
tmpClusterSSA_a.b = tmpAssignMemRhs;
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: 1
 - 4: 2
 - eval returned: ("<crash[ Cannot create property 'b' on number 'NaN' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
