# Preval test case

# param_default.md

> Normalize > This > Param default
>
> The `this` object is a valid default expression

## Input

`````js filename=intro
function f(a = this) {
  return a;
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
