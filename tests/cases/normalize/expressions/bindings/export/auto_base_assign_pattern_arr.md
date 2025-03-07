# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Bindings > Export > Auto base assign pattern arr
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

export let a = ([b] = $([$(2)]));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, tmpClusterSSA_b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, tmpClusterSSA_b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = ([b] = $([$(2)]));
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = undefined;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 2 );
const c = [ b ];
const d = $( c );
const e = [ ...d ];
const f = e[ 0 ];
a = d;
export { a as a };
$( a, f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope