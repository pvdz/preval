# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > For c > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (; $(1); [b] = $([$(2)]));
$(a, b);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = [];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ = [tmpArrElement];
  const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpArrPatternSplat /*:array*/ = [...tmpArrAssignPatternRhs];
  b = tmpArrPatternSplat[0];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpArrElement$1 /*:unknown*/ = $(2);
      const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
      const tmpArrAssignPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrAssignPatternRhs$1];
      b = tmpArrPatternSplat$1[0];
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = [];
if ($(1)) {
  const tmpArrElement = $(2);
  const tmpArrAssignPatternRhs = $([tmpArrElement]);
  b = [...tmpArrAssignPatternRhs][0];
  while (true) {
    if ($(1)) {
      const tmpArrElement$1 = $(2);
      const tmpArrAssignPatternRhs$1 = $([tmpArrElement$1]);
      b = [...tmpArrAssignPatternRhs$1][0];
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = [];
const b = $( 1 );
if (b) {
  const c = $( 2 );
  const d = [ c ];
  const e = $( d );
  const f = [ ...e ];
  a = f[ 0 ];
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( 2 );
      const i = [ h ];
      const j = $( i );
      const k = [ ...j ];
      a = k[ 0 ];
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
$( l, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpArrElement = $(2);
    let tmpCalleeParam = [tmpArrElement];
    const tmpArrAssignPatternRhs = $(tmpCalleeParam);
    const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
    b = tmpArrPatternSplat[0];
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: 1
 - 5: 2
 - 6: [2]
 - 7: 1
 - 8: 2
 - 9: [2]
 - 10: 1
 - 11: 2
 - 12: [2]
 - 13: 1
 - 14: 2
 - 15: [2]
 - 16: 1
 - 17: 2
 - 18: [2]
 - 19: 1
 - 20: 2
 - 21: [2]
 - 22: 1
 - 23: 2
 - 24: [2]
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
