# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Let > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let xyz = $(b)[$("$")](1);
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
let xyz = $(b)[$('$')](1);
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
let xyz = tmpCallCompObj[tmpCallCompProp](1);
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const xyz = tmpCallCompObj[tmpCallCompProp](1);
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
