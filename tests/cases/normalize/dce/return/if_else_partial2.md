# Preval test case

# if_else_partial2.md

> Normalize > Dce > Return > If else partial2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
  } else {
    return 2;
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "keep, do not eval" );
  $( undefined );
}
else {
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'keep, do not eval'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
