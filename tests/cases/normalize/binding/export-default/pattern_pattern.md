# Preval test case

# pattern_pattern.md

> Normalize > Binding > Export-default > Pattern pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
export let [a, b] = [, x, y] = z;
$(a, b, x, y, z);
`````


## Settled


`````js filename=intro
const z /*:array*/ /*truthy*/ = [10, 20, 30];
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...z];
const x /*:unknown*/ = tmpArrPatternSplat$1[1];
const y /*:unknown*/ = tmpArrPatternSplat$1[2];
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...z];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const b /*:unknown*/ = tmpArrPatternSplat[1];
export { a, b };
$(a, b, x, y, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const z = [10, 20, 30];
const tmpArrPatternSplat$1 = [...z];
const x = tmpArrPatternSplat$1[1];
const y = tmpArrPatternSplat$1[2];
const tmpArrPatternSplat = [...z];
const a = tmpArrPatternSplat[0];
const b = tmpArrPatternSplat[1];
export { a, b };
$(a, b, x, y, z);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = [ ...a ];
const c = b[ 1 ];
const d = b[ 2 ];
const e = [ ...a ];
const f = e[ 0 ];
const g = e[ 1 ];
export { f as a,g as b };
$( f, g, c, d, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let tmpBindingPatternArrRoot = undefined;
const tmpNestedAssignArrPatternRhs = z;
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat$1[1];
y = tmpArrPatternSplat$1[2];
tmpBindingPatternArrRoot = tmpNestedAssignArrPatternRhs;
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let b = tmpArrPatternSplat[1];
export { a, b };
$(a, b, x, y, z);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
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
