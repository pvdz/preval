# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Logic or both > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
(b[$("c")] = $(b)[$("d")]) || (b[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Settled


`````js filename=intro
const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const a /*:object*/ = { a: 999, b: 1000 };
if (varInitAssignLhsComputedRhs) {
  $(a, b);
} else {
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`d`);
  const tmpAssignComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const a = { a: 999, b: 1000 };
if (varInitAssignLhsComputedRhs) {
  $(a, b);
} else {
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj$1[tmpCompProp$1];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
(b[$(`c`)] = $(b)[$(`d`)]) || (b[$(`c`)] = $(b)[$(`d`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpAssignComMemLhsObj = b;
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj$1[tmpCompProp$1];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
const f = {
  a: 999,
  b: 1000,
};
if (e) {
  $( f, b );
}
else {
  const g = $( "c" );
  const h = $( b );
  const i = $( "d" );
  const j = h[ i ];
  b[g] = j;
  $( f, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'c'
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
