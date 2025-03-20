# Preval test case

# default_yes_yes_no__obj_arr_null.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) }) {
  return y;
}
$(f({ x: [null], a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
$( null );
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
