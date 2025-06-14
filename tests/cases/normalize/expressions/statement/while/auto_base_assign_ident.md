# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > While > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
while ((b = $(2))) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
let tmpClusterSSA_b /*:unknown*/ = $(2);
if (tmpClusterSSA_b) {
  while ($LOOP_UNROLL_10) {
    $(100);
    tmpClusterSSA_b = $(2);
    if (tmpClusterSSA_b) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_b = $(2);
if (tmpClusterSSA_b) {
  while (true) {
    $(100);
    tmpClusterSSA_b = $(2);
    if (!tmpClusterSSA_b) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    a = $( 2 );
    if (a) {

    }
    else {
      break;
    }
  }
}
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  b = $(2);
  const tmpIfTest = b;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 2
 - 4: 100
 - 5: 2
 - 6: 100
 - 7: 2
 - 8: 100
 - 9: 2
 - 10: 100
 - 11: 2
 - 12: 100
 - 13: 2
 - 14: 100
 - 15: 2
 - 16: 100
 - 17: 2
 - 18: 100
 - 19: 2
 - 20: 100
 - 21: 2
 - 22: 100
 - 23: 2
 - 24: 100
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
