# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([...x] = $(['pass'])) {
  return x;
}
$(f(undefined, 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass`];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const x /*:array*/ = arrPatternSplat.slice(0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $([`pass`]);
$([...bindingPatternArrRoot].slice(0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass" ];
const b = $( a );
const c = [ ...b ];
const d = c.slice( 0 );
$( d );
`````


## Todos triggered


- replace with $array_slice
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
