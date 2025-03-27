# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident computed c-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[((1, 2, $(b))[$("c")] = $(b)[$("d")])];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp$1 /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
$coerce(varInitAssignLhsComputedRhs, `string`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
$coerce(varInitAssignLhsComputedRhs, `string`);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
b[c] = f;
$coerce( f, "string" );
const g = {
  a: 999,
  b: 1000,
};
$( g, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
