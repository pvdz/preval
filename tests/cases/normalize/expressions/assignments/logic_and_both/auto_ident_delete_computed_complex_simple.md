# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete $(arg)["y"]) && (a = delete $(arg)["y"]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete $(arg)[`y`]) && (a = delete $(arg)[`y`]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpDeleteObj$1 = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
let tmpClusterSSA_a = delete tmpDeleteObj.y;
const tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpDeleteObj$1 = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(tmpClusterSSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: {}
 - 3: true
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
