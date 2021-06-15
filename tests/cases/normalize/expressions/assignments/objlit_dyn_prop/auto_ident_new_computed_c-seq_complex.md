# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ [(a = new (1, 2, $(b))[$("$")](1))]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$({ [(a = new (1, 2, $(b))[$(`$`)](1))]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpCompProp = $(`$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCompProp = $(`$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpClusterSSA_a = new tmpNewCallee(1);
const tmpCalleeParam = { [tmpClusterSSA_a]: 10 };
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { '[object Object]': '10' }
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
