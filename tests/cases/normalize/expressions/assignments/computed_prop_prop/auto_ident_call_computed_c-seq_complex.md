# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_call_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b))[$("$")](1))];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same