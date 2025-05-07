# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([...x] = [1, 2, 3]);
$(x);
`````


## Settled


`````js filename=intro
x = [1, 2, 3];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = [1, 2, 3];
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = [ 1, 2, 3 ];
$( x );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
