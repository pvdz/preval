# Preval test case

# auto_ident_call_computed_simple_simple.md

> normalize > expressions > bindings > export > auto_ident_call_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = b["$"](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = b['$'](1);
export { a };
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = b['$'](1);
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
