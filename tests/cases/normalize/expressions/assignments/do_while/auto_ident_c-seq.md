# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ($(1), $(2), $(x))));
$(a, x);
`````


## Settled


`````js filename=intro
$(100);
$(1);
$(2);
const tmpClusterSSA_a /*:unknown*/ = $(1);
if (tmpClusterSSA_a) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    a = $(1);
    if (a) {
    } else {
      break;
    }
  }
  $(a, 1);
} else {
  $(tmpClusterSSA_a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(1);
$(2);
const tmpClusterSSA_a = $(1);
if (tmpClusterSSA_a) {
  let a = undefined;
  while (true) {
    $(100);
    $(1);
    $(2);
    a = $(1);
    if (!a) {
      break;
    }
  }
  $(a, 1);
} else {
  $(tmpClusterSSA_a, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 2 );
const a = $( 1 );
if (a) {
  let b = undefined;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    b = $( 1 );
    if (b) {

    }
    else {
      break;
    }
  }
  $( b, 1 );
}
else {
  $( a, 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  a = $(x);
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x);
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
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
