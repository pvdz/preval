# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Call > Auto ident prop simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((b.c = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
b.c = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam$1];
b.c = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
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
const c = $( "d" );
const d = b[ c ];
a.c = d;
$( d );
const e = {
  a: 999,
  b: 1000,
};
$( e, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
