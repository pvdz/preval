# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident call computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) + (1, 2, b)["$"](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(100) + (1, 2, b)[`\$`](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCallObj = b;
const tmpBinBothRhs = tmpCallObj.$(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { $: $ };
const tmpBinBothRhs /*:unknown*/ = b.$(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = { $: $ };
const c = b.$( 1 );
a + c;
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
