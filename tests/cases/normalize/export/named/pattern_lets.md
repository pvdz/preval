# Preval test case

# pattern_lets.md

> Normalize > Export > Named > Pattern lets
>
> Exporting declarations

## Input

`````js filename=intro
export let [a, b, {c: [d]}] = [1, 2, {c: [3]}];
$(a, b, d);
`````


## Settled


`````js filename=intro
const a /*:number*/ /*truthy*/ = 1;
const b /*:number*/ /*truthy*/ = 2;
const d /*:number*/ /*truthy*/ = 3;
export { a, b, d };
$(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 1;
const b = 2;
const d = 3;
export { a, b, d };
$(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1;
const b = 2;
const c = 3;
export { a as a,b as b,c as d };
$( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = 1;
const tmpArrElement$1 = 2;
const tmpObjLitVal = [3];
const tmpArrElement$3 = { c: tmpObjLitVal };
let tmpBindingPatternArrRoot = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let b = tmpArrPatternSplat[1];
let tmpArrPatternStep = tmpArrPatternSplat[2];
let tmpOPND = tmpArrPatternStep.c;
let tmpArrPatternSplat$1 = [...tmpOPND];
let d = tmpArrPatternSplat$1[0];
export { a, b, d };
$(a, b, d);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
