# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Switch default > Auto ident prop complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $(b).c = $(b)[$("d")];
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { c: 10, d: 20 };
const tmpAssignMemLhsObj$1 /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpAssignMemRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const b = { c: 10, d: 20 };
const tmpAssignMemLhsObj$1 = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
tmpAssignMemLhsObj$1.c = tmpCompObj[tmpCalleeParam];
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
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
