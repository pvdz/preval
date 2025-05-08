# Preval test case

# pattern_pattern.md

> Normalize > Binding > Stmt-global-top > Pattern pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let [a, b] = [, x, y] = z;
$(a, b, x, y, z);
`````


## Settled


`````js filename=intro
const z /*:array*/ = [10, 20, 30];
const tmpArrPatternSplat$1 /*:array*/ = [...z];
const x /*:unknown*/ = tmpArrPatternSplat$1[1];
const y /*:unknown*/ = tmpArrPatternSplat$1[2];
const tmpArrPatternSplat /*:array*/ = [...z];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const b /*:unknown*/ = tmpArrPatternSplat[1];
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
$(tmpArrPatternSplat[0], tmpArrPatternSplat[1], x, y, z);
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
$( f, g, c, d, a );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 20, 20, 30, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
