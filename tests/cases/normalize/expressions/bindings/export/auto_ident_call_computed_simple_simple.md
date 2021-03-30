# Preval test case

# auto_ident_call_computed_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident call computed simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = b["$"](1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = b['$'](1);
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
