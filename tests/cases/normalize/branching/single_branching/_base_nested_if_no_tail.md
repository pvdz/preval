# Preval test case

# _base_nested_if_no_tail.md

> Normalize > Branching > Single branching > Base nested if no tail
>
> Functions should have at most one if-else and abstract others

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    // This if-else should be abstracted into its own function
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    return $(5);
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
  const tmpReturnArg$3 /*:unknown*/ = $(5);
  $(tmpReturnArg$3, `final`);
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
  $($(5), `final`);
}
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
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
