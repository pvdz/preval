# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$([...(a = new (1, 2, b)[$("$")](1))]);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([...(a = new (1, 2, b)[$(`$`)](1))]);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpCompProp = $(`$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCompProp = $(`$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCompProp];
const tmpClusterSSA_a = new tmpNewCallee(1);
const tmpCalleeParam = [...tmpClusterSSA_a];
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
