# Preval test case

# default_yes_yes_no__obj_obj_undefined.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes yes no  obj obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_y /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`pass`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
