# Preval test case

# default_no_no__arr_null.md

> Normalize > Pattern > Param > Arr > Obj > Default no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{}]) {
  return 'ok';
}
$(f([null, 20, 30], 200));
`````


## Settled


`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
null.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
