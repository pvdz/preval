# Preval test case

# default_yes_yes__obj_empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: '', b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$5 /*:array*/ = [];
const y /*:unknown*/ = $objPatternRest(``, tmpCalleeParam$5, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(``, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( "", a, undefined );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
