# Preval test case

# break_problem_false2.md

> Flow > Break problem false2
>
> Must track all labeled breaks when checking if a binding is mutated

## Input

`````js filename=intro
const tmpLabeledBlockFunc = function () {
  const tmpIfTest$3 = $(false);
  if (tmpIfTest$3) {
    $('fail');
    return undefined;
  } else {
    $('pass');
    return undefined;
  }
  $('pass');
  return undefined;
};
tmpLabeledBlockFunc();
`````


## Settled


`````js filename=intro
const tmpIfTest$3 /*:unknown*/ = $(false);
if (tmpIfTest$3) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
