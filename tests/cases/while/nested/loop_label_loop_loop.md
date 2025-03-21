# Preval test case

# loop_label_loop_loop.md

> While > Nested > Loop label loop loop
>
>

## Input

`````js filename=intro
let x = 10;
while(true) {
  foo: {
    while (true) {
      const t = $(x);
      if (t) {
        while (true) {
          if ($) {
            break foo;
          }
        }
      } else {
        x = 20;
      }
      $(x);
    }
  }
}
`````


## Settled


`````js filename=intro
let x /*:number*/ = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  foo: {
    const t /*:unknown*/ = $(x);
    if (t) {
      while (true) {
        if ($) {
          break foo;
        } else {
        }
      }
    } else {
      x = 20;
      $(20);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 10;
while (true) {
  foo: {
    if ($(x)) {
      while (true) {
        if ($) {
          break foo;
        }
      }
    } else {
      x = 20;
      $(20);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  foo: {
    const b = $( a );
    if (b) {
      while (true) {
        if ($) {
          break foo;
        }
      }
    }
    else {
      a = 20;
      $( 20 );
    }
  }
}
`````


## Todos triggered


- (todo) Support referencing this builtin in isFree: $
- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - 4: 10
 - 5: 10
 - 6: 10
 - 7: 10
 - 8: 10
 - 9: 10
 - 10: 10
 - 11: 10
 - 12: 10
 - 13: 10
 - 14: 10
 - 15: 10
 - 16: 10
 - 17: 10
 - 18: 10
 - 19: 10
 - 20: 10
 - 21: 10
 - 22: 10
 - 23: 10
 - 24: 10
 - 25: 10
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
