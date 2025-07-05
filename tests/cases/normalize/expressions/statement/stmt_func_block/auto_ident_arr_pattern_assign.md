# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let x = 1,
      y = 2;

    let a = { a: 999, b: 1000 };
    [x, y] = [$(3), $(4)];
    $(a, x, y);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpArrElement, tmpArrElement$1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$({ a: 999, b: 1000 }, tmpArrElement, tmpArrElement$1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = {
  a: 999,
  b: 1000,
};
$( c, a, b );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let y = 2;
  let a = { a: 999, b: 1000 };
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpArrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  x = tmpArrPatternSplat[0];
  y = tmpArrPatternSplat[1];
  $(a, x, y);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support ObjectExpression as var init in let_hoisting noob check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { a: '999', b: '1000' }, 3, 4
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
