# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Do while > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((b = $(2)));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
let b /*:unknown*/ = $(2);
if (b) {
  while ($LOOP_UNROLL_10) {
    $(100);
    b = $(2);
    if (b) {
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
$(100);
let b = $(2);
if (b) {
  while (true) {
    $(100);
    b = $(2);
    if (!b) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
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
  $(100);
  b = $(2);
  const tmpIfTest = b;
  if (tmpIfTest) {
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
 - 1: 100
 - 2: 2
 - 3: 100
 - 4: 2
 - 5: 100
 - 6: 2
 - 7: 100
 - 8: 2
 - 9: 100
 - 10: 2
 - 11: 100
 - 12: 2
 - 13: 100
 - 14: 2
 - 15: 100
 - 16: 2
 - 17: 100
 - 18: 2
 - 19: 100
 - 20: 2
 - 21: 100
 - 22: 2
 - 23: 100
 - 24: 2
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
