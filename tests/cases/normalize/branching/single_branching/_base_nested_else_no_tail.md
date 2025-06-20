# Preval test case

# _base_nested_else_no_tail.md

> Normalize > Branching > Single branching > Base nested else no tail
>
> Functions should have at most one if-else and abstract others

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return $(2);
  } else {
    if ($(3)) {
      return $(4);
    } else {
      return $(5);
    }
  }
}
$(f(), 'final');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(2);
  $(tmpClusterSSA_tmpCalleeParam, `final`);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(3);
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(4);
    $(tmpClusterSSA_tmpCalleeParam$1, `final`);
  } else {
    const tmpClusterSSA_tmpCalleeParam$3 /*:unknown*/ = $(5);
    $(tmpClusterSSA_tmpCalleeParam$3, `final`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $($(2), `final`);
} else {
  if ($(3)) {
    $($(4), `final`);
  } else {
    $($(5), `final`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  $( b, "final" );
}
else {
  const c = $( 3 );
  if (c) {
    const d = $( 4 );
    $( d, "final" );
  }
  else {
    const e = $( 5 );
    $( e, "final" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  } else {
    const tmpIfTest$1 = $(3);
    if (tmpIfTest$1) {
      const tmpReturnArg$1 = $(4);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$3 = $(5);
      return tmpReturnArg$3;
    }
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
 - 1: 1
 - 2: 2
 - 3: 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
