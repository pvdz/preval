# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident new computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
[...new (1, 2, b)[$("$")](1)];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
[...new (1, 2, b)[$(`$`)](1)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpArrElToSpread = new tmpNewCallee(1);
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompProp = $(`$`);
const tmpNewCallee = b[tmpCompProp];
const tmpArrElToSpread = new tmpNewCallee(1);
[...tmpArrElToSpread];
$(a);
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
