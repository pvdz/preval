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
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  $(1, tmpClusterSSA_x);
  while (true) {
    const tmpIfTest /*:unknown*/ = $(`a`, tmpClusterSSA_x);
    if (tmpIfTest) {
      break A;
    } else {
      const tmpIfTest$1 /*:unknown*/ = $(`b`, tmpClusterSSA_x);
      if (tmpIfTest$1) {
        break;
      } else {
        $(42);
      }
    }
  }
  $(5, tmpClusterSSA_x);
}
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
A: {
  const tmpClusterSSA_x = $(0);
  $(1, tmpClusterSSA_x);
  while (true) {
    if ($(`a`, tmpClusterSSA_x)) {
      break A;
    } else {
      if ($(`b`, tmpClusterSSA_x)) {
        break;
      } else {
        $(42);
      }
    }
  }
  $(5, tmpClusterSSA_x);
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
