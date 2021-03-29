# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, $(b))[$("$")](1)) + (a = new (1, 2, $(b))[$("$")](1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a = new (1, 2, $(b))[$('$')](1)) + (a = new (1, 2, $(b))[$('$')](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpBinBothLhs = a;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('$');
const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
a = new tmpNewCallee$1(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpSSA_a = new tmpNewCallee(1);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('$');
const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
const tmpSSA_a$1 = new tmpNewCallee$1(1);
const tmpCalleeParam = tmpSSA_a + tmpSSA_a$1;
$(tmpCalleeParam);
$(tmpSSA_a$1);
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
 - 7: '[object Object][object Object]'
 - 8: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
