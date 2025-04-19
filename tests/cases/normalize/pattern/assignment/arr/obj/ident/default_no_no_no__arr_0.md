# Preval test case

# default_no_no_no__arr_0.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x }] = [0, 20, 30]);
$(x);
`````


## Settled


`````js filename=intro
x = (0).x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = (0).x;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = (0).x;
$( x );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


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
