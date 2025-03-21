# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Logic or both > Auto ident prop complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
($(b).c = $(b)[$("d")]) || ($(b).c = $(b)[$("d")]);
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const a /*:object*/ = { a: 999, b: 1000 };
if (varInitAssignLhsComputedRhs) {
  $(a, b);
} else {
  const tmpAssignMemLhsObj /*:unknown*/ = $(b);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const a = { a: 999, b: 1000 };
if (varInitAssignLhsComputedRhs) {
  $(a, b);
} else {
  const tmpAssignMemLhsObj = $(b);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  tmpAssignMemLhsObj.c = tmpCompObj$1[tmpCompProp$1];
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
($(b).c = $(b)[$(`d`)]) || ($(b).c = $(b)[$(`d`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpAssignMemLhsObj = $(b);
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpAssignMemRhs = tmpCompObj$1[tmpCompProp$1];
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
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
if (e) {
  $( f, a );
}
else {
  const g = $( a );
  const h = $( a );
  const i = $( "d" );
  const j = h[ i ];
  g.c = j;
  $( f, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '10', d: '20' }
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
