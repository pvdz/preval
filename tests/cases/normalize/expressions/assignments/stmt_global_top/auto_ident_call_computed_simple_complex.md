# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
a = b[$("$")](1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
a = b[$(`$`)](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`$`);
a = tmpCallCompObj[tmpCallCompProp](1);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCompProp = $(`$`);
const b = { $: $ };
const a = b[tmpCallCompProp](1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
