# Preval test case

# label_if-hoisting.md

> Tofix > label if-hoisting
>
> Testing to see whether it'll properly hoist labels in branches

## Input

`````js filename=intro
if ($(1)) {
  A: {
    if ($(2)) {
      break A;
    }
    $(3);
  } 
} else {
  B: {
    if ($(3)) {
      break B;
    }
    $(4);
  }
}
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
  } else {
    $(3);
  }
} else {
  const tmpIfTest$3 /*:unknown*/ = $(3);
  if (tmpIfTest$3) {
  } else {
    $(4);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if (!$(2)) {
    $(3);
  }
} else {
  if (!$(3)) {
    $(4);
  }
}
`````

## Pre Normal


`````js filename=intro
if ($(1)) {
  A: {
    if ($(2)) {
      break A;
    }
    $(3);
  }
} else {
  B: {
    if ($(3)) {
      break B;
    }
    $(4);
  }
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  A: {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      break A;
    } else {
      $(3);
    }
  }
} else {
  B: {
    const tmpIfTest$3 = $(3);
    if (tmpIfTest$3) {
      break B;
    } else {
      $(4);
    }
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  if (b) {

  }
  else {
    $( 3 );
  }
}
else {
  const c = $( 3 );
  if (c) {

  }
  else {
    $( 4 );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
