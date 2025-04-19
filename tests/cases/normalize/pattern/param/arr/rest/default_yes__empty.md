# Preval test case

# default_yes__empty.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([...x] = $(['pass'])) {
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass`];
const tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const x /*:array*/ = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = $([`pass`]);
$($dotCall($array_slice, [...tmpBindingPatternArrRoot], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass" ];
const b = $( a );
const c = [ ...b ];
const d = $dotCall( $array_slice, c, "slice", 0 );
$( d );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice


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
