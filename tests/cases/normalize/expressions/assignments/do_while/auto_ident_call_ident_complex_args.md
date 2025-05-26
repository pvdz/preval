# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Do while > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(1), $(2))));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
if (tmpClusterSSA_a) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$2 /*:unknown*/ = $(1);
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$2, tmpCalleeParam$4);
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpClusterSSA_a = $($(1), $(2));
if (tmpClusterSSA_a) {
  let a = undefined;
  while (true) {
    $(100);
    a = $($(1), $(2));
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
if (c) {
  let d = undefined;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( 1 );
    const f = $( 2 );
    d = $( e, f );
    if (d) {

    }
    else {
      break;
    }
  }
  $( d );
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpCalleeParam = $(1);
  let tmpCalleeParam$1 = $(2);
  a = $(tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1, 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1, 2
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
