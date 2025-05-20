# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Statement > Ternary c > Auto ident prop c-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ((1, 2, $(b)).c = $(b)[$("d")]);
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
  const tmpAssignMemLhsObj$1 /*:unknown*/ = $(b);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
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
  const tmpAssignMemLhsObj$1 = $(b);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  tmpAssignMemLhsObj$1.c = tmpCompObj[tmpCalleeParam];
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


## Todos triggered


None


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
