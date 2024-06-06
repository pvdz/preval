# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident new computed simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = new b["$"](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = new b[`\$`](1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpNewCallee = b.$;
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const a = new $(1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
export { a as a from "undefined"
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
