# Preval test case

# default_yes_yes__arr_empty.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('pass')] = $('fail2')) {
  return x;
}
$(f([], 200));
`````


## Settled


`````js filename=intro
const tmpArrPatternStep /*:unknown*/ = $(`pass`);
const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrPatternStep];
const x /*:array*/ = $dotCall($array_slice, tmpArrPatternSplat$1, `slice`, 0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrPatternStep = $(`pass`);
$($dotCall($array_slice, [...tmpArrPatternStep], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = [ ...a ];
const c = $dotCall( $array_slice, b, "slice", 0 );
$( c );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: ['p', 'a', 's', 's']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
