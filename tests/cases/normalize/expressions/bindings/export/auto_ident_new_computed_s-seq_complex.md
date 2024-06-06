# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident new computed s-seq complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = new (1, 2, b)[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = new (1, 2, b)[$(`\$`)](1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpCompProp = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCompProp];
const a = new tmpNewCallee(1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
export { d as a from "undefined"
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
