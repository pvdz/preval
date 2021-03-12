# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Logic and left > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && $(100));
a["b"] = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && $(100));
a['b'] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
const tmpAssignMemRhs = $(2);
SSA_a.b = tmpAssignMemRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
