# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Binary right > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(100) + ([x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
$(1);
$(2);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
tmpBinBothLhs + tmpNestedAssignArrPatternRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_x, tmpClusterSSA_y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x = arrPatternSplat[0];
const tmpClusterSSA_y = arrPatternSplat[1];
tmpBinBothLhs + tmpNestedAssignArrPatternRhs;
$({ a: 999, b: 1000 }, tmpClusterSSA_x, tmpClusterSSA_y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$(100) + ([x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( 1 );
$( 2 );
const b = $( 3 );
const c = $( 4 );
const d = [ b, c ];
const e = [ ...d ];
const f = e[ 0 ];
const g = e[ 1 ];
a + d;
const h = {
  a: 999,
  b: 1000,
};
$( h, f, g );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope