# Preval test case

# auto_prop_complex_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto prop complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) ? $(100) : $(200));
$(a).b = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) ? $(100) : $(200));
$(a).b = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
if (SSA_a) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
const tmpAssignMemLhsObj = $(SSA_a);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: { b: '1' }
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
