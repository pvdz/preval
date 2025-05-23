# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
$(
  (a = $(b)[$("x")] = $(c)[$("y")] = d + e) &&
    (a = $(b)[$("x")] = $(c)[$("y")] = d + e)
);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = $(`y`);
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 7;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
$(7);
$(7, b, c, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedProp = $(`y`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
const tmpInitAssignLhsComputedObj$1 = $(b);
const tmpInitAssignLhsComputedProp$1 = $(`x`);
const tmpInitAssignLhsComputedObj$3 = $(c);
const tmpInitAssignLhsComputedProp$3 = $(`y`);
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 7;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
$(7);
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
const g = $( a );
const h = $( "x" );
const i = $( d );
const j = $( "y" );
i[j] = 7;
g[h] = 7;
$( 7 );
$( 7, a, d, 3, 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedProp = $(`y`);
const tmpInitAssignLhsComputedRhs = d + e;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpInitAssignLhsComputedObj$1 = $(b);
  const tmpInitAssignLhsComputedProp$1 = $(`x`);
  const tmpInitAssignLhsComputedObj$3 = $(c);
  const tmpInitAssignLhsComputedProp$3 = $(`y`);
  const tmpInitAssignLhsComputedRhs$3 = d + e;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
  const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
  const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b, c, d, e);
} else {
  $(tmpCalleeParam);
  $(a, b, c, d, e);
}
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
 - 5: { x: '7' }
 - 6: 'x'
 - 7: { y: '7' }
 - 8: 'y'
 - 9: 7
 - 10: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
