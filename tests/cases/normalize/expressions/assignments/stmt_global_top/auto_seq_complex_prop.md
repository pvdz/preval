# Preval test case

# auto_seq_complex_prop.md

> Normalize > Expressions > Assignments > Stmt global top > Auto seq complex prop
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(a = { b: $(1) })($(1), $(a)).b = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
(a = { b: $(1) })($(1), $(a)).b = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCallCallee = a;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(a);
const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpSSA_a = { b: tmpObjLitVal };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(tmpSSA_a);
const tmpAssignMemLhsObj = tmpSSA_a(tmpCalleeParam, tmpCalleeParam$1);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
