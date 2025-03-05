# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > For c > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); --$($(b)).x);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    --$($(b)).x;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCalleeParam = $(b);
    const tmpAssignMemLhsObj = $(tmpCalleeParam);
    const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpCompoundAssignLhs /*:unknown*/ = tmpAssignMemLhsObj.x;
  const tmpAssignMemRhs /*:number*/ = tmpCompoundAssignLhs - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(b);
      const tmpAssignMemLhsObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpCompoundAssignLhs$1 /*:unknown*/ = tmpAssignMemLhsObj$1.x;
      const tmpAssignMemRhs$1 /*:number*/ = tmpCompoundAssignLhs$1 - 1;
      tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
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
const a = $( 1 );
const b = { x: 1 };
if (a) {
  const c = $( b );
  const d = $( c );
  const e = d.x;
  const f = e - 1;
  d.x = f;
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( b );
      const i = $( h );
      const j = i.x;
      const k = j - 1;
      i.x = k;
    }
    else {
      break;
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '0' }
 - 6: { x: '0' }
 - 7: 1
 - 8: { x: '-1' }
 - 9: { x: '-1' }
 - 10: 1
 - 11: { x: '-2' }
 - 12: { x: '-2' }
 - 13: 1
 - 14: { x: '-3' }
 - 15: { x: '-3' }
 - 16: 1
 - 17: { x: '-4' }
 - 18: { x: '-4' }
 - 19: 1
 - 20: { x: '-5' }
 - 21: { x: '-5' }
 - 22: 1
 - 23: { x: '-6' }
 - 24: { x: '-6' }
 - 25: 1
 - 26: { x: '-7' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
