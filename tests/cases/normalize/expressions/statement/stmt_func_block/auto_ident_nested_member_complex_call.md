# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 },
      c = { y: 2 },
      d = 3;

    let a = { a: 999, b: 1000 };
    $(b)[$("x")] = $(c)[$("y")] = $(d);
    $(a, b, c, d);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpInitAssignLhsComputedRhs;
const a /*:object*/ = { a: 999, b: 1000 };
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
const tmpInitAssignLhsComputedRhs = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpInitAssignLhsComputedRhs;
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
const g = $( 3 );
e[f] = g;
b[c] = g;
const h = {
  a: 999,
  b: 1000,
};
$( h, a, d, 3 );
$( undefined );
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
 - 5: 3
 - 6: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
