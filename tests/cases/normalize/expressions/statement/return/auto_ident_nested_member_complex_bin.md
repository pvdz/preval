# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > Return > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
function f() {
  return ($(b)[$("x")] = $(c)[$("y")] = d + e);
}
$(f());
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ /*truthy*/ = { y: 2 };
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
$(7);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b, c, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj$1 = $(c);
const tmpInitAssignLhsComputedProp$1 = $(`y`);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
$(7);
$({ a: 999, b: 1000 }, b, c, 3, 4);
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
e[f] = 7;
b[c] = 7;
$( 7 );
const g = {
  a: 999,
  b: 1000,
};
$( g, a, d, 3, 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(c);
  const tmpInitAssignLhsComputedProp$1 = $(`y`);
  const tmpInitAssignLhsComputedRhs$1 = d + e;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
  const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  return tmpInitAssignLhsComputedRhs;
};
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c, d, e);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 7
 - 6: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
