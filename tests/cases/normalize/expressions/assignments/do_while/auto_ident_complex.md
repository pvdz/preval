# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
let a /*:unknown*/ = $(1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    a = $(1);
    if (a) {
    } else {
      break;
    }
  }
  $(a, 1);
} else {
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
let a = $(1);
if (a) {
  while (true) {
    $(100);
    a = $(1);
    if (!a) {
      break;
    }
  }
  $(a, 1);
} else {
  $(a, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
let a = $( 1 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    a = $( 1 );
    if (a) {

    }
    else {
      break;
    }
  }
  $( a, 1 );
}
else {
  $( a, 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  a = $(b);
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
