# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (($($(b)).x++).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      ($($(b)).x++).x = tmpForInNext.value;
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forIn;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
let tmpForInGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(b);
    const tmpPostUpdArgObj = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemLhsObj$1 = tmpPostUpdArgObj;
    const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
    const tmpAssignMemLhsObj = tmpPostUpdArgVal;
    const tmpAssignMemLhsObj$3 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs$1 = tmpForInNext.value;
    tmpAssignMemLhsObj$3.x = tmpAssignMemRhs$1;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForInGen = $forIn(tmpCalleeParam);
const b = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 = $(b);
    const tmpPostUpdArgObj = $(tmpCalleeParam$3);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
    tmpPostUpdArgObj.x = tmpAssignMemRhs;
    const tmpAssignMemRhs$1 = tmpForInNext.value;
    tmpPostUpdArgVal.x = tmpAssignMemRhs$1;
  }
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
const d = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( g );
    const i = h.x;
    const j = i + 1;
    h.x = j;
    const k = e.value;
    i.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
