# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident call computed complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = $(b)[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = $(b)[$(`\$`)](1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
let a = tmpCallCompObj[tmpCallCompProp](1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const a = tmpCallCompObj[tmpCallCompProp](1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ]( 1 )};
export { d as a };
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
