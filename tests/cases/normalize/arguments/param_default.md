# Preval test case

# param_default.md

> Normalize > Arguments > Param default
>
> The `arguments` object is a valid default expression

## Input

`````js filename=intro
function f(a = arguments) {
  return a;
}
$(f(1, 2, 3));
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
