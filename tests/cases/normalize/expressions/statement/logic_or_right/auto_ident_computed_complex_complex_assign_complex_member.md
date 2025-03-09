# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Logic or right > Auto ident computed complex complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(100) || ($(b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const tmpAssignComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$(100) || ($(b)[$(`c`)] = $(b)[$(`d`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
const c = {
  c: 10,
  d: 20,
};
if (a) {
  $( b, c );
}
else {
  const d = $( c );
  const e = $( "c" );
  const f = $( c );
  const g = $( "d" );
  const h = f[ g ];
  d[e] = h;
  $( b, c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 
  { a: '999', b: '1000' },
  { c: '10', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
