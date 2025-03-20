# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > Export default > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
export default a = $(b)[$("x")] = $(c)[$("y")] = d + e;
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
const tmpAnonDefaultExport /*:number*/ = 7;
export { tmpAnonDefaultExport as default };
$(7, b, c, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
const tmpAnonDefaultExport = 7;
export { tmpAnonDefaultExport as default };
$(7, b, c, 3, 4);
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
const g = 7;
export { g as default };
$( 7, a, d, 3, 4 );
`````


## Todos triggered


- free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
