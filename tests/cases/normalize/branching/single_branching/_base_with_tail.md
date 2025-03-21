# Preval test case

# _base_with_tail.md

> Normalize > Branching > Single branching > Base with tail
>
> I'm not sure yet but I think we need to split this example such that the tail becomes its own function and both branches call into it.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
  } else {
    $(3);
  }
  return $(3); // This should be abstracted?
}
$(f(), 'final');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
const tmpReturnArg /*:unknown*/ = $(3);
$(tmpReturnArg, `final`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
} else {
  $(3);
}
$($(3), `final`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
else {
  $( 3 );
}
const b = $( 3 );
$( b, "final" );
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
