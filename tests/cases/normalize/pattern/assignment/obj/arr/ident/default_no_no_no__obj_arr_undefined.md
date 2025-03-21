# Preval test case

# default_no_no_no__obj_arr_undefined.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default no no no  obj arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y] } = { x: [undefined], a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = undefined;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = undefined;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
y = undefined;
$( undefined );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read


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
