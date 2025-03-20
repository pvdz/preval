# Preval test case

# if_else4.md

> Normalize > Dce > Return > If else4
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return 2;
  }
  return 3;
  $('fail');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
} else {
  $(3);
}
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
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
