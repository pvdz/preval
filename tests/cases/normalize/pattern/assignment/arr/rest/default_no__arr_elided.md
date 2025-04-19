# Preval test case

# default_no__arr_elided.md

> Normalize > Pattern > Assignment > Arr > Rest > Default no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([...x] = [, , , 1]);
$(x);
`````


## Settled


`````js filename=intro
x = [undefined, undefined, undefined, 1];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = [undefined, undefined, undefined, 1];
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = [ undefined, undefined, undefined, 1 ];
$( x );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) arr mutation may be able to inline this method: tmpCallCompVal


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
