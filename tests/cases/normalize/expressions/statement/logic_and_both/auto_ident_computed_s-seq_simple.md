# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, b)[$("c")] && (1, 2, b)[$("c")];
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpIfTest /*:unknown*/ = b[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompProp$1 /*:unknown*/ = $(`c`);
  b[tmpCompProp$1];
  $(a, b);
} else {
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpIfTest = b[tmpCompProp];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompProp$1 = $(`c`);
  b[tmpCompProp$1];
  $(a, b);
} else {
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
(1, 2, b)[$(`c`)] && (1, 2, b)[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
const tmpIfTest = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
  const tmpCompObj$1 = b;
  const tmpCompProp$1 = $(`c`);
  tmpCompObj$1[tmpCompProp$1];
  $(a, b);
} else {
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  const e = $( "c" );
  b[ e ];
  $( d, b );
}
else {
  $( d, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'c'
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
