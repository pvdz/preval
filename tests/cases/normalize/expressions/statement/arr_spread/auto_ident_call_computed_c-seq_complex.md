# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > statement > arr_spread > auto_ident_call_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
[...(1, 2, $(b))[$("$")](1)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
1;
2;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
let tmpArrElToSpread = tmpCallCompObj[tmpCallCompProp](1);
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
let tmpArrElToSpread = tmpCallCompObj[tmpCallCompProp](1);
[...tmpArrElToSpread];
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
