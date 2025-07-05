# Preval test case

# ssa_if_hoisting_loop20.md

> If hoisting > Ai > Ssa if hoisting loop20
>
> Test if_hoisting and SSA infinite loop: identical var declarations with conditional expressions

## Input

`````js filename=intro
const choice = $("choice");
if (choice) {
  let cond1 = choice ? "yes" : "no";
  $(cond1);
} else {
  let cond2 = choice ? "yes" : "no";
  $(cond2);
}
`````


## Settled


`````js filename=intro
const choice /*:unknown*/ = $(`choice`);
if (choice) {
  $(`yes`);
} else {
  $(`no`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`choice`)) {
  $(`yes`);
} else {
  $(`no`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "choice" );
if (a) {
  $( "yes" );
}
else {
  $( "no" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const choice = $(`choice`);
if (choice) {
  let cond1 = undefined;
  if (choice) {
    cond1 = `yes`;
    $(cond1);
  } else {
    cond1 = `no`;
    $(cond1);
  }
} else {
  let cond2 = undefined;
  if (choice) {
    cond2 = `yes`;
    $(cond2);
  } else {
    cond2 = `no`;
    $(cond2);
  }
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'choice'
 - 2: 'yes'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
