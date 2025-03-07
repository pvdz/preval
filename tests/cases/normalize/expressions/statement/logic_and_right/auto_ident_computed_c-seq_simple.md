# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and right > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(100) && (1, 2, $(b))[$("c")];
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`c`);
  tmpCompObj[tmpCompProp];
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const b = { c: 1 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(100) && (1, 2, $(b))[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
} else {
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { c: 1 };
if (a) {
  const c = $( b );
  const d = $( "c" );
  c[ d ];
}
const e = {
  a: 999,
  b: 1000,
};
$( e, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
