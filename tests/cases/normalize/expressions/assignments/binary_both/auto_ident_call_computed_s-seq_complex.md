# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$("$")](1)) + (a = (1, 2, b)[$("$")](1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$(`\$`)](1)) + (a = (1, 2, b)[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpBinBothLhs = a;
const tmpCallCompObj$1 = b;
const tmpCallCompProp$1 = $(`\$`);
a = tmpCallCompObj$1[tmpCallCompProp$1](1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const a = b[tmpCallCompProp](1);
const tmpCallCompProp$1 = $(`\$`);
const tmpClusterSSA_a = b[tmpCallCompProp$1](1);
const tmpCalleeParam = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
const d = $( "$" );
const e = b[ d ]( 1 );
const f = c + e;
$( f );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
