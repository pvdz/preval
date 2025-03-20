# Preval test case

# base.md

> Function > Base
>
> Func decl after return that is used

The DCE should not eliminate the function or the code will break. This one is simple, eh.

## Input

`````js filename=intro
function f(x) {
}
$(f(1));
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
