# Preval test case

# ssa_if_hoisting_loop17.md

> If hoisting > Ai > Ssa if hoisting loop17
>
> Test if_hoisting and SSA infinite loop: identical var declarations with new expressions

## Input

`````js filename=intro
const create = $("create");
if (create) {
  let new1 = new Date();
  $(new1);
} else {
  let new2 = new Date();
  $(new2);
}
`````


## Settled


`````js filename=intro
$(`create`);
const new1 /*:date*/ /*truthy*/ = new $date_constructor();
$(new1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`create`);
$(new $date_constructor());
`````


## PST Settled
With rename=true

`````js filename=intro
$( "create" );
const a = new $date_constructor();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const create = $(`create`);
if (create) {
  let new1 = new $date_constructor();
  $(new1);
} else {
  let new2 = new $date_constructor();
  $(new2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'create'
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
