# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$($(100) + (a = $(b)[$("x")] = $(c)[$("y")] = d));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + 3;
$(tmpCalleeParam);
$(3, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(tmpBinBothLhs + 3);
$(3, b, c, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = $( b );
const d = $( "x" );
const e = { y: 2 };
const f = $( e );
const g = $( "y" );
f[g] = 3;
c[d] = 3;
const h = a + 3;
$( h );
$( 3, b, e, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 103
 - 7: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
