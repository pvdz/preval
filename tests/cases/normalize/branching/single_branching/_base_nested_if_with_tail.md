# Preval test case

# _base_nested_if_with_tail.md

> Normalize > Branching > Single branching > Base nested if with tail
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
    $(6);
  }
  return $(7);
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
  $(6);
  const tmpReturnArg$1 /*:unknown*/ = $(7);
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
  $(6);
  $($(7), `final`);
}
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
  $( 6 );
  const d = $( 7 );
  $( d, "final" );
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
