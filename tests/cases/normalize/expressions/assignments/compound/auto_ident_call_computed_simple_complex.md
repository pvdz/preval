# Preval test case

# auto_ident_call_computed_simple_complex.md

> normalize > expressions > assignments > compound > auto_ident_call_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a *= b[$("$")](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpBinBothRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpBinBothRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same