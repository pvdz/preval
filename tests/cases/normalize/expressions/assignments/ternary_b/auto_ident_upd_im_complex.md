# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(b)).x--) : $(200));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(b)).x--) : $(200));
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
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
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
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpPostUpdArgObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  tmpCalleeParam = tmpPostUpdArgVal;
  $(tmpPostUpdArgVal);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
let b = undefined;
const c = $( 1 );
const d = { x: 1 };
if (c) {
  const e = $( d );
  const f = $( e );
  const g = f.x;
  const h = g - 1;
  f.x = h;
  a = g;
  b = g;
  $( g );
}
else {
  b = $( 200 );
  $( b );
}
$( a, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
