# Preval test case

# ai_if_literal_bool_condition.md

> Ai > Ai1 > Ai if literal bool condition
>
> Test: if statements with literal true/false conditions.

## Input

`````js filename=intro
// Expected (true): $("then"); $("after");
// Expected (false): $("else"); $("after");
if (true) {
  $("then");
} else {
  $("else_never_run");
}

if (false) {
  $("then_never_run");
} else {
  $("else");
}
$("after");
`````


## Settled


`````js filename=intro
$(`then`);
$(`else`);
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`then`);
$(`else`);
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "then" );
$( "else" );
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`then`);
$(`else`);
$(`after`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'then'
 - 2: 'else'
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
