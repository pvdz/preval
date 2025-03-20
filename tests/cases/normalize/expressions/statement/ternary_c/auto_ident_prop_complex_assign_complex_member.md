# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Ternary c > Auto ident prop complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ($(b).c = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  const tmpAssignMemLhsObj /*:unknown*/ = $(b);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  const tmpAssignMemLhsObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  tmpAssignMemLhsObj.c = tmpCompObj[tmpCompProp];
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
const c = {
  c: 10,
  d: 20,
};
if (a) {
  $( 100 );
  $( b, c );
}
else {
  const d = $( c );
  const e = $( c );
  const f = $( "d" );
  const g = e[ f ];
  d.c = g;
  $( b, c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
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
