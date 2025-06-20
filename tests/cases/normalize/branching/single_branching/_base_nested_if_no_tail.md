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
    const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(3);
    $(tmpClusterSSA_tmpCalleeParam, `final`);
  } else {
    const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(4);
    $(tmpClusterSSA_tmpCalleeParam$1, `final`);
  }
} else {
  const tmpClusterSSA_tmpCalleeParam$3 /*:unknown*/ = $(5);
  $(tmpClusterSSA_tmpCalleeParam$3, `final`);
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


## Normalized
(This is what phase1 received the first time)

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
    const tmpReturnArg$3 = $(5);
    return tmpReturnArg$3;
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
 - 3: 3
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
