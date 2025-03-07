# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident new computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new b["$"](1) + new b["$"](1);
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:object*/ = new $(1);
const tmpBinBothRhs /*:object*/ = new $(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
new $(1) + new $(1);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new b[`\$`](1) + new b[`\$`](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpNewCallee$1 = b.$;
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = new $( 1 );
a + b;
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
