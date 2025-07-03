# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Binary right > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(100) + (a = [x, y] = ($(x), $(y), [$(3), $(4)])));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
$(1);
$(2);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
const tmpSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpNestedAssignArrPatternRhs;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs, tmpSSA_x, tmpSSA_y);
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
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x = tmpArrPatternSplat[0];
const tmpSSA_y = tmpArrPatternSplat[1];
$(tmpBinBothLhs + tmpNestedAssignArrPatternRhs);
$(tmpNestedAssignArrPatternRhs, tmpSSA_x, tmpSSA_y);
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
const h = a + d;
$( h );
$( d, f, g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: '1003,4'
 - 7: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
