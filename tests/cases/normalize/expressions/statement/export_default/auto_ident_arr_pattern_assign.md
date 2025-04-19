# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Export default > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
export default [x, y] = [$(3), $(4)];
$(a, x, y);
`````


## Settled


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = undefined;
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
const tmpClusterSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = undefined;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x = tmpArrPatternSplat[0];
const tmpClusterSSA_y = tmpArrPatternSplat[1];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 }, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 3 );
const c = $( 4 );
const d = [ b, c ];
const e = [ ...d ];
const f = e[ 0 ];
const g = e[ 1 ];
a = d;
export { a as default };
const h = {
  a: 999,
  b: 1000,
};
$( h, f, g );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
