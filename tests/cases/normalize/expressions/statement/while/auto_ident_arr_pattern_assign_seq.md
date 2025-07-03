# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > While > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
while (([x, y] = ($(x), $(y), [$(3), $(4)]))) $(100);
$(a, x, y);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  $(y);
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
while (true) {
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( b );
  const c = $( 3 );
  const d = $( 4 );
  a = c;
  b = d;
  $( 100 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = tmpArrPatternSplat[0];
  y = tmpArrPatternSplat[1];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 100
 - 6: 3
 - 7: 4
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 3
 - 14: 4
 - 15: 100
 - 16: 3
 - 17: 4
 - 18: 3
 - 19: 4
 - 20: 100
 - 21: 3
 - 22: 4
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
