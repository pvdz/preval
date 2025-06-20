# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > For c > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = new ($($))($(1), $(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpNewCallee /*:unknown*/ = $($);
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  let tmpClusterSSA_a /*:object*/ /*truthy*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNewCallee$1 /*:unknown*/ = $($);
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      const tmpCalleeParam$4 /*:unknown*/ = $(2);
      tmpClusterSSA_a = new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  let tmpClusterSSA_a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  while (true) {
    if ($(1)) {
      const tmpNewCallee$1 = $($);
      const tmpCalleeParam$2 = $(1);
      const tmpCalleeParam$4 = $(2);
      tmpClusterSSA_a = new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( $ );
  const c = $( 1 );
  const d = $( 2 );
  let e = new b( c, d );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( $ );
      const h = $( 1 );
      const i = $( 2 );
      e = new g( h, i );
    }
    else {
      break;
    }
  }
  $( e );
}
else {
  const j = {
    a: 999,
    b: 1000,
  };
  $( j );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNewCallee = $($);
    let tmpCalleeParam = $(1);
    let tmpCalleeParam$1 = $(2);
    a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) Support this node type in isFree: NewExpression
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 1
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
