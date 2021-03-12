# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(b)).x++) : $(200));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(b)).x++) : $(200));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  const tmpNestedComplexRhs = tmpPostUpdArgVal;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
  tmpPostUpdArgObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  tmpCalleeParam = tmpPostUpdArgVal;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: 1, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
