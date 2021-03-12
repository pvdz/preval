# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident new computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${new (1, 2, $(b))[$("$")](1)} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$`before ${new (1, 2, $(b))[$('$')](1)} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCompObj = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpCalleeParam$1 = new tmpNewCallee(1);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpCompObj = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpCalleeParam$1 = new tmpNewCallee(1);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: ['before ', ' after'], {}
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
