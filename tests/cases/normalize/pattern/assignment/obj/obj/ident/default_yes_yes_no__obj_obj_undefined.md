# Preval test case

# default_yes_yes_no__obj_obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = $(`pass`);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = $(`pass`);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = $( "pass" );
$( y );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
