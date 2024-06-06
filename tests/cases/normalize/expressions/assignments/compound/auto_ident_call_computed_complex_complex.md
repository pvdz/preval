# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a *= $(b)[$("$")](1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a *= $(b)[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpBinBothRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpBinBothRhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpClusterSSA_a = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
a: 999,
b: 1000
;
const c = $( a );
const d = $( "$" );
const e = c[ d ]( 1 )};
const f = b * e;
$( f );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: NaN
 - 5: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
