# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('pass')]) {
  return x;
}
$(f('', 200));
`````


## Settled


`````js filename=intro
const arrPatternStep /*:unknown*/ = $(`pass`);
const arrPatternSplat$1 /*:array*/ = [...arrPatternStep];
const x /*:array*/ = arrPatternSplat$1.slice(0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $(`pass`);
$([...arrPatternStep].slice(0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = [ ...a ];
const c = b.slice( 0 );
$( c );
`````


## Todos triggered


- inline computed array property read
- replace with $array_slice
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice


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
