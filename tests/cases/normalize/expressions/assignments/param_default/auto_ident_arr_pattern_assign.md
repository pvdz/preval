# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Param default > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
function f(p = (a = [x, y] = [$(3), $(4)])) {}
$(f());
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
const tmpSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
$(undefined);
$(tmpNestedAssignArrPatternRhs, tmpSSA_x, tmpSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x = tmpArrPatternSplat[0];
const tmpSSA_y = tmpArrPatternSplat[1];
$(undefined);
$(tmpNestedAssignArrPatternRhs, tmpSSA_x, tmpSSA_y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
const e = d[ 0 ];
const f = d[ 1 ];
$( undefined );
$( c, e, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: undefined
 - 4: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
