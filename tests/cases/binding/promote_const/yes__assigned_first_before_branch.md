# Preval test case

# yes__assigned_first_before_branch.md

> Binding > Promote const > Yes  assigned first before branch
>
> Trying to create classic tdz problems

The var is first updated before any branching so we should be able to safely determine it to be a constant.

This is the correct example of a hoisted var that is a constant.

## Input

`````js filename=intro
var x;
$("something");
x = 100;
if ($(1)) {
  $(x);
}
$(x);
`````


## Settled


`````js filename=intro
$(`something`);
const tmpIfTest /*:unknown*/ = $(1);
$(100);
if (tmpIfTest) {
  $(100);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`something`);
const tmpIfTest = $(1);
$(100);
if (tmpIfTest) {
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "something" );
const a = $( 1 );
$( 100 );
if (a) {
  $( 100 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
$(`something`);
x = 100;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(x);
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
 - 1: 'something'
 - 2: 1
 - 3: 100
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
