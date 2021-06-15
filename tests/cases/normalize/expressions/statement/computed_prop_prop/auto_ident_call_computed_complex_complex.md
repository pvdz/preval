# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[$(b)[$("$")](1)];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[$(b)[$(`$`)](1)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`$`);
const tmpCompProp = tmpCallCompObj[tmpCallCompProp](1);
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`$`);
const tmpCompProp = tmpCallCompObj[tmpCallCompProp](1);
obj[tmpCompProp];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
