# Preval test case

# no__assigned_first_in_branch.md

> Binding > Promote const > No  assigned first in branch
>
> Trying to create classic tdz problems

The var is first updated in a branch so we can't make it a constant.

## Input

`````js filename=intro
var x = 100;
if ($(1)) {
  x = 10;
}
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
} else {
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(10);
} else {
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 10 );
}
else {
  $( 100 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = 100;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
