# Preval test case

# simple_pattern.md

> Normalize > Binding > Export-default > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
export let a = [x, y] = z;
$(a, x, y, z);
`````


## Settled


`````js filename=intro
const z /*:array*/ /*truthy*/ = [10, 20, 30];
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...z];
const x /*:unknown*/ = tmpArrPatternSplat[0];
const y /*:unknown*/ = tmpArrPatternSplat[1];
export { z as a };
$(z, x, y, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const z = [10, 20, 30];
const tmpArrPatternSplat = [...z];
const x = tmpArrPatternSplat[0];
const y = tmpArrPatternSplat[1];
export { z as a };
$(z, x, y, z);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = [ ...a ];
const c = b[ 0 ];
const d = b[ 1 ];
export { a as a };
$( a, c, d, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a = undefined;
const tmpNestedAssignArrPatternRhs = z;
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, x, y, z);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration
- (todo) support array reads statement type ExpressionStatement
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
