# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $($(b)).x--) || (a = $($(b)).x--));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $($(b)).x--) || (a = $($(b)).x--));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = tmpPostUpdArgVal;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(b);
  const tmpPostUpdArgObj$1 = tmpCallCallee$3(tmpCalleeParam$3);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemLhsObj$1 = tmpPostUpdArgObj$1;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
  const tmpNestedComplexRhs = tmpPostUpdArgVal$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
let tmpSSA_a = tmpPostUpdArgVal;
let tmpCalleeParam = tmpSSA_a;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$3 = $(b);
  const tmpPostUpdArgObj$1 = $(tmpCalleeParam$3);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
  tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
  tmpSSA_a = tmpPostUpdArgVal$1;
  tmpCalleeParam = tmpPostUpdArgVal$1;
}
$(tmpCalleeParam);
$(tmpSSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
