# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'pass' })] = '';
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: `pass` };
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpClusterSSA_tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 = $({ a: `pass` });
$($objPatternRest(tmpClusterSSA_tmpCalleeParam$1, [], undefined));
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternArrRoot = ``;
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpAPBD = tmpArrPatternSplat[0];
let tmpArrPatternStep = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = { a: `pass` };
  tmpArrPatternStep = $(tmpCalleeParam);
} else {
  tmpArrPatternStep = tmpAPBD;
}
let tmpCalleeParam$1 = tmpArrPatternStep;
let tmpCalleeParam$3 = [];
const x = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
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
