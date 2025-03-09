# Preval test case

# _base_nested_both_no_tail.md

> Normalize > Branching > Single branching > Base nested both no tail
>
> Functions should have at most one if-else and abstract others

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    if ($(5)) {
      return $(6);
    } else {
      return $(7);
    }
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
    const tmpReturnArg /*:unknown*/ = $(3);
    $(tmpReturnArg, `final`);
  } else {
    const tmpReturnArg$1 /*:unknown*/ = $(4);
    $(tmpReturnArg$1, `final`);
  }
} else {
  const tmpIfTest$3 /*:unknown*/ = $(5);
  if (tmpIfTest$3) {
    const tmpReturnArg$3 /*:unknown*/ = $(6);
    $(tmpReturnArg$3, `final`);
  } else {
    const tmpReturnArg$5 /*:unknown*/ = $(7);
    $(tmpReturnArg$5, `final`);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if ($(2)) {
    $($(3), `final`);
  } else {
    $($(4), `final`);
  }
} else {
  if ($(5)) {
    $($(6), `final`);
  } else {
    $($(7), `final`);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    if ($(5)) {
      return $(6);
    } else {
      return $(7);
    }
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
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = $(4);
      return tmpReturnArg$1;
    }
  } else {
    const tmpIfTest$3 = $(5);
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = $(6);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = $(7);
      return tmpReturnArg$5;
    }
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
    const c = $( 3 );
    $( c, "final" );
  }
  else {
    const d = $( 4 );
    $( d, "final" );
  }
}
else {
  const e = $( 5 );
  if (e) {
    const f = $( 6 );
    $( f, "final" );
  }
  else {
    const g = $( 7 );
    $( g, "final" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
