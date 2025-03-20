# Preval test case

# while2.md

> Normalize > Dce > Throw > While2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    throw $(1, 'throw');
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpThrowArg /*:unknown*/ = $(1, `throw`);
  throw tmpThrowArg;
} else {
  $(`keep, do not eval`);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
} else {
  $(`keep, do not eval`);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1, "throw" );
  throw b;
}
else {
  $( "keep, do not eval" );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
