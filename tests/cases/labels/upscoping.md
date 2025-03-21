# Preval test case

# upscoping.md

> Labels > Upscoping
>
>

## Input

`````js filename=intro
$(0);
A: {
  $(1);
  B: {
    while (true) {
      if ($()) break A;
      if ($()) break B;
      $(42);
    }
  }
  $(5);
}
$(6);
`````


## Settled


`````js filename=intro
A: {
  $(0);
  $(1);
  while (true) {
    const tmpIfTest /*:unknown*/ = $();
    if (tmpIfTest) {
      break A;
    } else {
      const tmpIfTest$1 /*:unknown*/ = $();
      if (tmpIfTest$1) {
        break;
      } else {
        $(42);
      }
    }
  }
  $(5);
}
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
A: {
  $(0);
  $(1);
  while (true) {
    if ($()) {
      break A;
    } else {
      if ($()) {
        break;
      } else {
        $(42);
      }
    }
  }
  $(5);
}
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
A: {
  $( 0 );
  $( 1 );
  while (true) {
    const a = $();
    if (a) {
      break A;
    }
    else {
      const b = $();
      if (b) {
        break;
      }
      else {
        $( 42 );
      }
    }
  }
  $( 5 );
}
$( 6 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 
 - 4: 
 - 5: 42
 - 6: 
 - 7: 
 - 8: 42
 - 9: 
 - 10: 
 - 11: 42
 - 12: 
 - 13: 
 - 14: 42
 - 15: 
 - 16: 
 - 17: 42
 - 18: 
 - 19: 
 - 20: 42
 - 21: 
 - 22: 
 - 23: 42
 - 24: 
 - 25: 
 - 26: 42
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
