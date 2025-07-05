# Preval test case

# upscoping_var.md

> Labels > Upscoping var
>
>

## Input

`````js filename=intro
var x = $(0);
A: {
  $(1, x);
  B: {
    while (true) {
      if ($('a', x)) break A;
      if ($('b', x)) break B;
      $(42);
    }
  }
  $(5, x);
}
$(6);
`````


## Settled


`````js filename=intro
A: {
  const x /*:unknown*/ = $(0);
  $(1, x);
  while (true) {
    const tmpIfTest /*:unknown*/ = $(`a`, x);
    if (tmpIfTest) {
      break A;
    } else {
      const tmpIfTest$1 /*:unknown*/ = $(`b`, x);
      if (tmpIfTest$1) {
        break;
      } else {
        $(42);
      }
    }
  }
  $(5, x);
}
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
A: {
  const x = $(0);
  $(1, x);
  while (true) {
    if ($(`a`, x)) {
      break A;
    } else {
      if ($(`b`, x)) {
        break;
      } else {
        $(42);
      }
    }
  }
  $(5, x);
}
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
A: {
  const a = $( 0 );
  $( 1, a );
  while (true) {
    const b = $( "a", a );
    if (b) {
      break A;
    }
    else {
      const c = $( "b", a );
      if (c) {
        break;
      }
      else {
        $( 42 );
      }
    }
  }
  $( 5, a );
}
$( 6 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
A: {
  x = $(0);
  $(1, x);
  while (true) {
    const tmpIfTest = $(`a`, x);
    if (tmpIfTest) {
      break A;
    } else {
      const tmpIfTest$1 = $(`b`, x);
      if (tmpIfTest$1) {
        break;
      } else {
        $(42);
      }
    }
  }
  $(5, x);
}
$(6);
`````


## Todos triggered


- (todo) - at least one of the call args to


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1, 0
 - 3: 'a', 0
 - 4: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
