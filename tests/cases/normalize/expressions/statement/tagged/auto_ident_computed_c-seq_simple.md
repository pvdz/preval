# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$`before ${(1, 2, $(b))[$("c")]} after`;
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const tmpCalleeParam$1 /*:unknown*/ = tmpCompObj[tmpCompProp];
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpCalleeParam$1 = tmpCompObj[tmpCompProp];
$([`before `, ` after`], tmpCalleeParam$1);
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (1, 2, $(b))[$(`c`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpCalleeParam$1 = tmpCompObj[tmpCompProp];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
const e = [ "before ", " after" ];
$( e, d );
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: ['before ', ' after'], 1
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
