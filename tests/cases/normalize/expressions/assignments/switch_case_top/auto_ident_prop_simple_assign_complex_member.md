# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = b.c = $(b)[$("d")];
}
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`d`);
  const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  b.c = tmpNestedPropAssignRhs;
  $(tmpNestedPropAssignRhs, b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
  b.c = tmpNestedPropAssignRhs;
  $(tmpNestedPropAssignRhs, b);
} else {
  $({ a: 999, b: 1000 }, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = {
  c: 10,
  d: 20,
};
if (c) {
  const e = $( d );
  const f = $( "d" );
  const g = e[ f ];
  d.c = g;
  $( g, d );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h, d );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
