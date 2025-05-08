# Preval test case

# default_yes_no_no__arr_obj_null.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes no no  arr obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('fail') }] = [{ x: null, y: 2, z: 3 }, 20, 30]);
$(x);
`````


## Settled


`````js filename=intro
x = null;
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = null;
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
x = null;
$( null );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
