# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg)).y) || (a = delete ($(1), $(2), $(arg)).y));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg)).y) || (a = delete ($(1), $(2), $(arg)).y));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  $(1);
  $(2);
  const tmpDeleteObj$1 = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
let tmpClusterSSA_a = delete tmpDeleteObj.y;
let tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
} else {
  $(1);
  $(2);
  const tmpDeleteObj$1 = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  tmpClusterSSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
