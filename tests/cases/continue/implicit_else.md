# Preval test case

# implicit_else.md

> Continue > Implicit else
>

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  }
  $('exit');
}
$('woohoo');
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:unknown*/ = $(false);
  if (tmpIfTest) {
    $(`uhoh`);
  } else {
    $(`exit`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  if ($(false)) {
    $(`uhoh`);
  } else {
    $(`exit`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( false );
  if (a) {
    $( "uhoh" );
  }
  else {
    $( "exit" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  $continue: {
    const tmpIfTest = $(false);
    if (tmpIfTest) {
      $(`uhoh`);
      break $continue;
    } else {
      $(`exit`);
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
 - 1: false
 - 2: 'exit'
 - 3: false
 - 4: 'exit'
 - 5: false
 - 6: 'exit'
 - 7: false
 - 8: 'exit'
 - 9: false
 - 10: 'exit'
 - 11: false
 - 12: 'exit'
 - 13: false
 - 14: 'exit'
 - 15: false
 - 16: 'exit'
 - 17: false
 - 18: 'exit'
 - 19: false
 - 20: 'exit'
 - 21: false
 - 22: 'exit'
 - 23: false
 - 24: 'exit'
 - 25: false
 - 26: 'exit'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
