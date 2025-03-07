# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b[$("$")](1) + b[$("$")](1);
$(a);
`````

## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpBinBothLhs /*:unknown*/ = b[tmpCallCompProp](1);
const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
const tmpBinBothRhs /*:unknown*/ = b[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const tmpBinBothLhs = b[tmpCallCompProp](1);
const tmpCallCompProp$1 = $(`\$`);
tmpBinBothLhs + b[tmpCallCompProp$1](1);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
b[$(`\$`)](1) + b[$(`\$`)](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
const tmpBinBothLhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 = b;
const tmpCallCompProp$1 = $(`\$`);
const tmpBinBothRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
const d = $( "$" );
const e = b[ d ]( 1 );
c + e;
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
