# Preval test case

# default_yes_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default yes no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'pass' })] = [, , , , 20, 30];
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: `pass` };
const tmpClusterSSA_arrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$3 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpClusterSSA_arrPatternStep, tmpCalleeParam$3, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_arrPatternStep = $({ a: `pass` });
$($objPatternRest(tmpClusterSSA_arrPatternStep, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: "pass" };
const b = $( a );
const c = [];
const d = $objPatternRest( b, c, undefined );
$( d );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
