# Preval test case

# _base_opt_call_undef_opt_prop.md

> Normalize > Optional > Base opt call undef opt prop
>
> Simple example

## Input

`````js filename=intro
var a = undefined;
$(a?.b?.());
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
