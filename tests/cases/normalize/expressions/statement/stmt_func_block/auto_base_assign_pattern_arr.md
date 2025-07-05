# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Stmt func block > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = [];

    let a = { a: 999, b: 1000 };
    [b] = $([$(2)]);
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpArrAssignPatternRhs];
const b /*:unknown*/ = tmpArrPatternSplat[0];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpArrAssignPatternRhs = $([tmpArrElement]);
const b = [...tmpArrAssignPatternRhs][0];
$({ a: 999, b: 1000 }, b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = {
  a: 999,
  b: 1000,
};
$( f, e );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = [];
  let a = { a: 999, b: 1000 };
  const tmpArrElement = $(2);
  let tmpCalleeParam = [tmpArrElement];
  const tmpArrAssignPatternRhs = $(tmpCalleeParam);
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  b = tmpArrPatternSplat[0];
  $(a, b);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support ObjectExpression as var init in let_hoisting noob check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: { a: '999', b: '1000' }, 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
