# Preval test case

# auto_seq_complex_computed_simple.md

> normalize > expressions > assignments > logic_or_right > auto_seq_complex_computed_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = { b: $(1) }));
($(1), $(a))["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - 5: 2
 - 6: { a: '999', b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
