# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident call computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, $(b))[$("$")](1) + (1, 2, $(b))[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
(1, 2, $(b))[$(`\$`)](1) + (1, 2, $(b))[$(`\$`)](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpBinBothLhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 = $(b);
const tmpCallCompProp$1 = $(`\$`);
const tmpBinBothRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpBinBothLhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 = $(b);
const tmpCallCompProp$1 = $(`\$`);
const tmpBinBothRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = $( a );
const d = $( "$" );
const e = c[ d ]( 1 )};
const f = $( a );
const g = $( "$" );
const h = f[ g ]( 1 )};
e + h;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: '$'
 - 6: 1
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
