# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Bindings > Export > Auto ident arr pattern assign seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

export let a = ([x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
const tmpSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
export { tmpNestedAssignArrPatternRhs as a };
$(tmpNestedAssignArrPatternRhs, tmpSSA_x, tmpSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x = tmpArrPatternSplat[0];
const tmpSSA_y = tmpArrPatternSplat[1];
export { tmpNestedAssignArrPatternRhs as a };
$(tmpNestedAssignArrPatternRhs, tmpSSA_x, tmpSSA_y);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
const e = d[ 0 ];
const f = d[ 1 ];
export { c as a };
$( c, e, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = undefined;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration
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
