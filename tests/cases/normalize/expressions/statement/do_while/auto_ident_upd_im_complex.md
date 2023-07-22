# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident upd im complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(b)).x--);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $($(b)).x--;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemLhsObj = tmpPostUpdArgObj;
    const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    tmpDoWhileFlag = tmpPostUpdArgVal;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
$(100);
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
let tmpClusterSSA_tmpDoWhileFlag = tmpPostUpdArgVal;
let $tmpLoopUnrollCheck = true;
if (tmpPostUpdArgVal) {
  $(100);
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
  tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpPostUpdArgVal$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = $(b);
      const tmpPostUpdArgObj$2 = $(tmpCalleeParam$2);
      const tmpPostUpdArgVal$2 = tmpPostUpdArgObj$2.x;
      const tmpAssignMemRhs$2 = tmpPostUpdArgVal$2 - 1;
      tmpPostUpdArgObj$2.x = tmpAssignMemRhs$2;
      tmpClusterSSA_tmpDoWhileFlag = tmpPostUpdArgVal$2;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
$( 100 );
const c = $( a );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
let g = e;
let h = true;
if (e) {
  $( 100 );
  const i = $( a );
  const j = $( i );
  const k = j.x;
  const l = k - 1;
  j.x = l;
  g = k;
}
else {
  h = false;
}
if (h) {
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const m = $( a );
      const n = $( m );
      const o = n.x;
      const p = o - 1;
      n.x = p;
      g = o;
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '0' }
 - 6: { x: '0' }
 - 7: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
