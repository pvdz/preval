# Preval test case

# ssa_if_hoisting_loop15.md

> If hoisting > Ai > Ssa if hoisting loop15
>
> Test if_hoisting and SSA infinite loop: identical var declarations with member expressions

## Input

`````js filename=intro
const config = $("config");
if (config) {
  let prop1 = Math.PI;
  $(prop1);
} else {
  let prop2 = Math.PI;
  $(prop2);
}
`````


## Settled


`````js filename=intro
$(`config`);
$($Math_PI);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`config`);
$($Math_PI);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "config" );
$( $Math_PI );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const config = $(`config`);
if (config) {
  let prop1 = $Math_PI;
  $($Math_PI);
} else {
  let prop2 = $Math_PI;
  $($Math_PI);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'config'
 - 2: 3.141592653589793
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
