# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident call computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = (1, 2, b)["$"](1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = (1, 2, b)[`$`](1);
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallObj = b;
let a = tmpCallObj.$(1);
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
