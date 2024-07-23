# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$("$")](1)) + $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$(`\$`)](1)) + $(100));
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
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const a = b[tmpCallCompProp](1);
const tmpBinBothRhs = $(100);
const tmpCalleeParam = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
const d = $( 100 );
const e = c + d;
$( e );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: 101
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
