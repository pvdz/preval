# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Logic and right > Auto ident prop simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(100) && (b.c = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const b /*:object*/ = { c: 10, d: 20 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  b.c = tmpAssignMemRhs;
  $(a, b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  b.c = tmpCompObj[tmpCalleeParam];
  $(a, b);
} else {
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  c: 10,
  d: 20,
};
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  const d = $( b );
  const e = $( "d" );
  const f = d[ e ];
  b.c = f;
  $( c, b );
}
else {
  $( c, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpAssignMemLhsObj = b;
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpAssignMemRhs = tmpCompObj[tmpCalleeParam];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  $(a, b);
} else {
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
