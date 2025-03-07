# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
$(b)[$("c")]["a"];
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const tmpCompObj /*:unknown*/ = tmpCompObj$1[tmpCompProp];
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj$1 = $(b);
const tmpCompProp = $(`c`);
tmpCompObj$1[tmpCompProp].a;
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
$(b)[$(`c`)][`a`];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = $(b);
const tmpCompProp = $(`c`);
const tmpCompObj = tmpCompObj$1[tmpCompProp];
tmpCompObj.a;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
d.a;
const e = {
  a: 999,
  b: 1000,
};
$( e, a );
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
