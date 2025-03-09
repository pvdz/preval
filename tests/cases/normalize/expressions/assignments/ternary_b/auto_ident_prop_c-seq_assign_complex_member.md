# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident prop c-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = (1, 2, $(b)).c = $(b)[$("d")]) : $(200));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$($(1) ? (a = (1, 2, $(b)).c = $(b)[$(`d`)]) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  c: 10,
  d: 20,
};
if (a) {
  const c = $( b );
  const d = $( b );
  const e = $( "d" );
  const f = d[ e ];
  c.c = f;
  $( f );
  $( f, b );
}
else {
  const g = $( 200 );
  $( g );
  const h = {
    a: 999,
    b: 1000,
  };
  $( h, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
