# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Logic or right > Auto ident computed s-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(100) || ((1, 2, b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
} else {
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const tmpAssignComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const b = { c: 10, d: 20 };
if (!tmpIfTest) {
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$(100) || ((1, 2, b)[$(`c`)] = $(b)[$(`d`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpAssignComMemLhsObj = b;
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  c: 10,
  d: 20,
};
if (a) {

}
else {
  const c = $( "c" );
  const d = $( b );
  const e = $( "d" );
  const f = d[ e ];
  b[c] = f;
}
const g = {
  a: 999,
  b: 1000,
};
$( g, b );
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
