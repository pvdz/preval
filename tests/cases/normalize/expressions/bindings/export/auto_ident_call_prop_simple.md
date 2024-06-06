# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident call prop simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = b.$(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = b.$(1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = b.$(1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = b.$(1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
export { b as a };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
