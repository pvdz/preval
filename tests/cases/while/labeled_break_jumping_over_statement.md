# Preval test case

# labeled_break_jumping_over_statement.md

> While > Labeled break jumping over statement
>
> The call with "fail" is unreachable because the break jumps over it.

## Input

`````js filename=intro
let x = 1;
again: while (true) {
  while (true) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      continue again;
    }
  }
  // the loop never breaks and the continue always skips over this. 
  // if anything it's dead code and should be eliminated 
  $('fail', x); // unreachable code
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ /*truthy*/ = 1;
while ($LOOP_NO_UNROLLS_LEFT) {
  $(x);
  if ($) {
  } else {
    x = 2;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
while (true) {
  $(x);
  if (!$) {
    x = 2;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
while ($LOOP_NO_UNROLLS_LEFT) {
  $( a );
  if ($) {

  }
  else {
    a = 2;
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
while (true) {
  nestedLoop: {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      break nestedLoop;
    }
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
