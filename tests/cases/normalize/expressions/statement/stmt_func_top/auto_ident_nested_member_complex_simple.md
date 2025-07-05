# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = { x: 1 },
    c = { y: 2 },
    d = 3;

  let a = { a: 999, b: 1000 };
  $(b)[$("x")] = $(c)[$("y")] = d;
  $(a, b, c, d);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
const c /*:object*/ /*truthy*/ = { y: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedProp = $(`y`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
$({ a: 999, b: 1000 }, b, c, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = { y: 2 };
const e = $( d );
const f = $( "y" );
e[f] = 3;
b[c] = 3;
const g = {
  a: 999,
  b: 1000,
};
$( g, a, d, 3 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let c = { y: 2 };
  let d = 3;
  let a = { a: 999, b: 1000 };
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = d;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  const tmpAssignComputedRhs = tmpInitAssignLhsComputedRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b, c, d);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
