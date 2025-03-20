# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > For c > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (; $(1); { b } = $({ b: $(2) }));
$(a, b);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = {};
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$1 /*:unknown*/ = $(2);
      const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
      const tmpAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      b = tmpAssignObjPatternRhs$1.b;
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
let b = {};
if ($(1)) {
  const tmpObjLitVal = $(2);
  b = $({ b: tmpObjLitVal }).b;
  while (true) {
    if ($(1)) {
      const tmpObjLitVal$1 = $(2);
      b = $({ b: tmpObjLitVal$1 }).b;
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
let a = {};
const b = $( 1 );
if (b) {
  const c = $( 2 );
  const d = { b: c };
  const e = $( d );
  a = e.b;
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( 2 );
      const h = { b: g };
      const i = $( h );
      a = i.b;
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


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: 1
 - 5: 2
 - 6: { b: '2' }
 - 7: 1
 - 8: 2
 - 9: { b: '2' }
 - 10: 1
 - 11: 2
 - 12: { b: '2' }
 - 13: 1
 - 14: 2
 - 15: { b: '2' }
 - 16: 1
 - 17: 2
 - 18: { b: '2' }
 - 19: 1
 - 20: 2
 - 21: { b: '2' }
 - 22: 1
 - 23: 2
 - 24: { b: '2' }
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
