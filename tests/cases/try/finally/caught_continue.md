# Preval test case

# caught_continue.md

> Try > Finally > Caught continue
>
> Finally transform checks

## Input

`````js filename=intro
try {
  $(1);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(2);
    if ($(3)) {
      continue; // should not be trapped by the finally
    }
    $(4);
  }
} finally {
  $(5);
}
`````


## Settled


`````js filename=intro
try {
  $(1);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(2);
    const tmpIfTest /*:unknown*/ = $(3);
    if (tmpIfTest) {
    } else {
      $(4);
    }
  }
} catch ($finalImplicit) {
  $(5);
  throw $finalImplicit;
}
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
  while (true) {
    $(2);
    if (!$(3)) {
      $(4);
    }
  }
} catch ($finalImplicit) {
  $(5);
  throw $finalImplicit;
}
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 2 );
    const a = $( 3 );
    if (a) {

    }
    else {
      $( 4 );
    }
  }
}
catch (b) {
  $( 5 );
  throw b;
}
$( 5 );
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 2
 - 5: 3
 - 6: 2
 - 7: 3
 - 8: 2
 - 9: 3
 - 10: 2
 - 11: 3
 - 12: 2
 - 13: 3
 - 14: 2
 - 15: 3
 - 16: 2
 - 17: 3
 - 18: 2
 - 19: 3
 - 20: 2
 - 21: 3
 - 22: 2
 - 23: 3
 - 24: 2
 - 25: 3
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
