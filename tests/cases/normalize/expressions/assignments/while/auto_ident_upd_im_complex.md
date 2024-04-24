# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > While > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = $($(b)).x--)) $(100);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ((a = $($(b)).x--)) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
const b = { x: 1 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
let tmpSSA_a = tmpPostUpdArgVal;
if (tmpPostUpdArgVal) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = $(b);
    const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
    const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
    const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
    tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
    tmpSSA_a = tmpPostUpdArgVal$1;
    if (tmpPostUpdArgVal$1) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = { x: 1 };
const c = $( b );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
let g = e;
if (e) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const h = $( b );
    const i = $( h );
    const j = i.x;
    const k = j - 1;
    i.x = k;
    g = j;
    if (j) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( g, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - 4: { x: '0' }
 - 5: { x: '0' }
 - 6: 0, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
