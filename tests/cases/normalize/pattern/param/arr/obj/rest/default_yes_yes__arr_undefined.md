# Preval test case

# default_yes_yes__arr_undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'pass' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([undefined, 20, 30], 200));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: `pass` };
const arrPatternStep /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam$5 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(arrPatternStep, tmpCalleeParam$5, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $({ a: `pass` });
$($objPatternRest(arrPatternStep, [], undefined));
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


- (todo) inline computed array property read
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
