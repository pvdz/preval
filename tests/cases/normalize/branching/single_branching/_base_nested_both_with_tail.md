# Preval test case

# _base_nested_both_with_tail.md

> Normalize > Branching > Single branching > Base nested both with tail
>
> Functions should have at most one if-else and abstract others

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    if ($(6)) {
      $(7);
    } else {
      $(8);
    }
    return $(9);
  }
}
$(f(), 'final');
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(3);
  } else {
    $(4);
  }
  const tmpReturnArg /*:unknown*/ = $(5);
  $(tmpReturnArg, `final`);
} else {
  const tmpIfTest$3 /*:unknown*/ = $(6);
  if (tmpIfTest$3) {
    $(7);
  } else {
    $(8);
  }
  const tmpReturnArg$1 /*:unknown*/ = $(9);
  $(tmpReturnArg$1, `final`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if ($(2)) {
    $(3);
  } else {
    $(4);
  }
  $($(5), `final`);
} else {
  if ($(6)) {
    $(7);
  } else {
    $(8);
  }
  $($(9), `final`);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    if ($(2)) {
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    if ($(6)) {
      $(7);
    } else {
      $(8);
    }
    return $(9);
  }
};
$(f(), `final`);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      $(3);
    } else {
      $(4);
    }
    const tmpReturnArg = $(5);
    return tmpReturnArg;
  } else {
    const tmpIfTest$3 = $(6);
    if (tmpIfTest$3) {
      $(7);
    } else {
      $(8);
    }
    const tmpReturnArg$1 = $(9);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, `final`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  if (b) {
    $( 3 );
  }
  else {
    $( 4 );
  }
  const c = $( 5 );
  $( c, "final" );
}
else {
  const d = $( 6 );
  if (d) {
    $( 7 );
  }
  else {
    $( 8 );
  }
  const e = $( 9 );
  $( e, "final" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 5
 - 5: 5, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
