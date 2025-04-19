# Preval test case

# base_props.md

> Normalize > Pattern > Assignment > Arr > Rest > Base props
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([a, ...x] = [1, 2, 3]);
$(x);
`````


## Settled


`````js filename=intro
a = 1;
x = [2, 3];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = 1;
x = [2, 3];
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
a = 1;
x = [ 2, 3 ];
$( x );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) arr mutation may be able to inline this method: tmpCallCompVal


## Globals


BAD@! Found 2 implicit global bindings:

a, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
