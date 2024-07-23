# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident call computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = b[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = b[$(`\$`)](1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
let a = tmpCallCompObj[tmpCallCompProp](1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const a = b[tmpCallCompProp](1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
export { c as a };
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
