# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Arr > Arr > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[[x]]] = [[[[1, 2, 3], 4, 5], 20, 30], 40, 50]);
$(x);
`````


## Settled


`````js filename=intro
const tmpArrElement$3 /*:array*/ = [1, 2, 3];
x = tmpArrElement$3;
$(tmpArrElement$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$3 = [1, 2, 3];
x = tmpArrElement$3;
$(tmpArrElement$3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
x = a;
$( a );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?


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
