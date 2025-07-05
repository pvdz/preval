# Preval test case

# ssa_if_hoisting_loop34.md

> If hoisting > Ai > Ssa if hoisting loop34
>
> Test if_hoisting and SSA infinite loop: identical vars with later reassignments

## Input

`````js filename=intro
const reassign = $("reassign");
if (reassign) {
  let var1 = 1500;
  $(var1);
  var1 = 2500;
  $(var1);
} else {
  let var2 = 1500;
  $(var2);
  var2 = 2500;
  $(var2);
}
`````


## Settled


`````js filename=intro
$(`reassign`);
$(1500);
$(2500);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`reassign`);
$(1500);
$(2500);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "reassign" );
$( 1500 );
$( 2500 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const reassign = $(`reassign`);
if (reassign) {
  let var1 = 1500;
  $(var1);
  var1 = 2500;
  $(var1);
} else {
  let var2 = 1500;
  $(var2);
  var2 = 2500;
  $(var2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'reassign'
 - 2: 1500
 - 3: 2500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
