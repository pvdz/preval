# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Statement > If > Auto ident call computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
if ((1, 2, $(b))[$("$")](1));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
tmpCallCompObj[tmpCallCompProp](1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompObj = $({ $: $ });
const tmpCallCompProp = $(`\$`);
tmpCallCompObj[tmpCallCompProp](1);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
if ((1, 2, $(b))[$(`\$`)](1));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpIfTest = tmpCallCompObj[tmpCallCompProp](1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
b[ c ]( 1 );
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
