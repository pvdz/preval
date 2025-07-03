# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Param default > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
function f(p = ([b] = $([$(2)]))) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
$(undefined);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpSSA_b = [...tmpNestedAssignArrPatternRhs][0];
$(undefined);
$({ a: 999, b: 1000 }, tmpSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
$( undefined );
const f = {
  a: 999,
  b: 1000,
};
$( f, e );
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
    const tmpArrElement = $(2);
    let tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = tmpArrPatternSplat[0];
    p = tmpNestedAssignArrPatternRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = [];
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: undefined
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
