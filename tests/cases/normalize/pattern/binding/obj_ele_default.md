# Preval test case

# obj_ele_default.md

> Normalize > Pattern > Binding > Obj ele default
>
> From tenko

This would crash.

## Input

`````js filename=intro
function f(a = {}) {
  let {
    x = false,
  } = a;
}
$(f());
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
