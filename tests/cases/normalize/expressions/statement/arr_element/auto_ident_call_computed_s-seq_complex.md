# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b)[$("$")](1) + (1, 2, b)[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
(1, 2, b)[$(`\$`)](1) + (1, 2, b)[$(`\$`)](1);
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

## Output


`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const tmpBinBothLhs = b[tmpCallCompProp](1);
const tmpCallCompProp$1 = $(`\$`);
const tmpBinBothRhs = b[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

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

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
