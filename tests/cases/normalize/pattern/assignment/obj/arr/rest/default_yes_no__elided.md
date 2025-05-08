# Preval test case

# default_yes_no__elided.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Default yes no  elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [...y] = $(['fail']) } = { x: [, , , 1], a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = [undefined, undefined, undefined, 1];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = [undefined, undefined, undefined, 1];
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
y = [ undefined, undefined, undefined, 1 ];
$( y );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
