# Preval test case

# inline_remainder-else.md

> Normalize > Return > Inline remainder-else
>
> If one branch returns early the remainder of the parent block should be inlined after the other branch.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
  } else {
    $(3);
    return $(4);
  }
  $(5);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
  $(5);
  $(undefined);
} else {
  $(3);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(4);
  $(tmpClusterSSA_tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
  $(5);
  $(undefined);
} else {
  $(3);
  $($(4));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
  $( 5 );
  $( undefined );
}
else {
  $( 3 );
  const b = $( 4 );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
    $(5);
    return undefined;
  } else {
    $(3);
    const tmpReturnArg = $(4);
    return tmpReturnArg;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 5
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
