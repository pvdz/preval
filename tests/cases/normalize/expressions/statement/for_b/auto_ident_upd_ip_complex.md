# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > For b > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $($(b)).x++; $(1));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($($(b)).x++) {
    $(1);
  }
}
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
  const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  const tmpIfTest = tmpPostUpdArgVal;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam);
const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
if (tmpPostUpdArgVal) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpPostUpdArgObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpPostUpdArgVal$1 /*:unknown*/ = tmpPostUpdArgObj$1.x;
    const tmpAssignMemRhs$1 /*:primitive*/ = tmpPostUpdArgVal$1 + 1;
    tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
    if (tmpPostUpdArgVal$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const f = $( a );
    const g = $( f );
    const h = g.x;
    const i = h + 1;
    g.x = i;
    if (h) {

    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: { x: '2' }
 - 5: { x: '2' }
 - 6: 1
 - 7: { x: '3' }
 - 8: { x: '3' }
 - 9: 1
 - 10: { x: '4' }
 - 11: { x: '4' }
 - 12: 1
 - 13: { x: '5' }
 - 14: { x: '5' }
 - 15: 1
 - 16: { x: '6' }
 - 17: { x: '6' }
 - 18: 1
 - 19: { x: '7' }
 - 20: { x: '7' }
 - 21: 1
 - 22: { x: '8' }
 - 23: { x: '8' }
 - 24: 1
 - 25: { x: '9' }
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
