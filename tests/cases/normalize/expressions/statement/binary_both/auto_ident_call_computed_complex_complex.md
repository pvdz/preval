# Preval test case

# auto_ident_call_computed_complex_complex.md

> normalize > expressions > statement > binary_both > auto_ident_call_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)[$("$")](1) + $(b)[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpBinBothLhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 = $(b);
const tmpCallCompProp$1 = $('$');
const tmpBinBothRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpBinBothLhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 = $(b);
const tmpCallCompProp$1 = $('$');
const tmpBinBothRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
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

Normalized calls: Same

Final output calls: Same
