# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))[$("c")] || (1, 2, $(b))[$("c")];
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const tmpIfTest /*:unknown*/ = tmpCompObj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`c`);
  tmpCompObj$1[tmpCompProp$1];
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpIfTest = tmpCompObj[tmpCompProp];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`c`);
  tmpCompObj$1[tmpCompProp$1];
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
(1, 2, $(b))[$(`c`)] || (1, 2, $(b))[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpIfTest = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`c`);
  tmpCompObj$1[tmpCompProp$1];
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  $( e, a );
}
else {
  const f = $( a );
  const g = $( "c" );
  f[ g ];
  $( e, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
