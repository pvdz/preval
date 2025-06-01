# Preval test case

# ai_if_condition_is_assignment.md

> Ai > Ai1 > Ai if condition is assignment
>
> Test: if statement whose condition is an assignment.

## Input

`````js filename=intro
// Expected: (Assignment happens, its result used as condition, x has correct value)
let x;
if (x = $('cond_assign')) {
  $('true_branch', x);
} else {
  $('false_branch', x);
}
$('after', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`cond_assign`);
if (x) {
  $(`true_branch`, x);
  $(`after`, x);
} else {
  $(`false_branch`, x);
  $(`after`, x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`cond_assign`);
if (x) {
  $(`true_branch`, x);
  $(`after`, x);
} else {
  $(`false_branch`, x);
  $(`after`, x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond_assign" );
if (a) {
  $( "true_branch", a );
  $( "after", a );
}
else {
  $( "false_branch", a );
  $( "after", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = $(`cond_assign`);
const tmpIfTest = x;
if (tmpIfTest) {
  $(`true_branch`, x);
  $(`after`, x);
} else {
  $(`false_branch`, x);
  $(`after`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond_assign'
 - 2: 'true_branch', 'cond_assign'
 - 3: 'after', 'cond_assign'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
