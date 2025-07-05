# Preval test case

# kept5.md

> Continue > Kept5
>
> Example of where continue is not eliminated

## Input

`````js filename=intro

exit: while ($LOOP_NO_UNROLLS_LEFT) {
  again: while ($LOOP_NO_UNROLLS_LEFT) {
    if ($(1)) {
      if ($(2)) {
        break again;
      }
    }
    if ($(3)) {
      break exit;
    }
  }
}
$(4);

while ($LOOP_NO_UNROLLS_LEFT) {
  let continued = false;
  if ($(5)) {
    if ($(6)) {
      
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (!continued) {
    if ($(7)) {
      break;
    }
  }
}
$(8);

`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  nestedLoop: {
    const tmpIfTest /*:unknown*/ = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 /*:unknown*/ = $(2);
      if (tmpIfTest$1) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$3 /*:unknown*/ = $(3);
    if (tmpIfTest$3) {
      break;
    } else {
    }
  }
}
$(4);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpIfTest$5 /*:unknown*/ = $(5);
  if (tmpIfTest$5) {
    const tmpIfTest$7 /*:unknown*/ = $(6);
    if (tmpIfTest$7) {
      const tmpIfTest$9 /*:unknown*/ = $(7);
      if (tmpIfTest$9) {
        break;
      } else {
      }
    } else {
    }
  } else {
  }
}
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  nestedLoop: {
    if ($(1)) {
      if ($(2)) {
        break nestedLoop;
      }
    }
    if ($(3)) {
      break;
    }
  }
}
$(4);
while (true) {
  if ($(5)) {
    if ($(6)) {
      if ($(7)) {
        break;
      }
    }
  }
}
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  nestedLoop: {
    const a = $( 1 );
    if (a) {
      const b = $( 2 );
      if (b) {
        break nestedLoop;
      }
    }
    const c = $( 3 );
    if (c) {
      break;
    }
  }
}
$( 4 );
while ($LOOP_NO_UNROLLS_LEFT) {
  const d = $( 5 );
  if (d) {
    const e = $( 6 );
    if (e) {
      const f = $( 7 );
      if (f) {
        break;
      }
    }
  }
}
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  nestedLoop: {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(2);
      if (tmpIfTest$1) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$3 = $(3);
    if (tmpIfTest$3) {
      break;
    } else {
    }
  }
}
$(4);
while ($LOOP_NO_UNROLLS_LEFT) {
  let continued = false;
  const tmpIfTest$5 = $(5);
  if (tmpIfTest$5) {
    const tmpIfTest$7 = $(6);
    if (tmpIfTest$7) {
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    const tmpIfTest$9 = $(7);
    if (tmpIfTest$9) {
      break;
    } else {
    }
  }
}
$(8);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
