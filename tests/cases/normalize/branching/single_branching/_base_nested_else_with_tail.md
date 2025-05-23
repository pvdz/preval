# Preval test case

# _base_nested_else_with_tail.md

> Normalize > Branching > Single branching > Base nested else with tail
>
> Functions should have at most one if-else and abstract others

## Input

`````js filename=intro
function f() {
  if ($(0)) {
    $(2);
  } else {
    if ($(3)) {
      $(4);
    } else {
      $(5);
    }
    return $(6);
  }
  return $(7);
}
$(f(), 'final');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(2);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(7);
  $(tmpClusterSSA_tmpCalleeParam, `final`);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(3);
  if (tmpIfTest$1) {
    $(4);
  } else {
    $(5);
  }
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(6);
  $(tmpClusterSSA_tmpCalleeParam$1, `final`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(2);
  $($(7), `final`);
} else {
  if ($(3)) {
    $(4);
  } else {
    $(5);
  }
  $($(6), `final`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 2 );
  const b = $( 7 );
  $( b, "final" );
}
else {
  const c = $( 3 );
  if (c) {
    $( 4 );
  }
  else {
    $( 5 );
  }
  const d = $( 6 );
  $( d, "final" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg$1 = $(7);
    return tmpReturnArg$1;
  } else {
    const tmpIfTest$1 = $(3);
    if (tmpIfTest$1) {
      $(4);
    } else {
      $(5);
    }
    const tmpReturnArg = $(6);
    return tmpReturnArg;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam, `final`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 3
 - 3: 4
 - 4: 6
 - 5: 6, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
