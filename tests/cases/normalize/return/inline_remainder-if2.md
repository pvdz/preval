# Preval test case

# inline_remainder-if2.md

> Normalize > Return > Inline remainder-if2
>
> If one branch returns early the remainder of the parent block should be inlined after the other branch.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
    return $(3);
  }
  $(4);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
  const tmpCalleeParam /*:unknown*/ = $(3);
  $(tmpCalleeParam);
} else {
  $(4);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
  $($(3));
} else {
  $(4);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
  const b = $( 3 );
  $( b );
}
else {
  $( 4 );
  $( undefined );
}
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
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
