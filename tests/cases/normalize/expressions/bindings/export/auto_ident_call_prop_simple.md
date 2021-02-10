# Preval test case

# auto_ident_call_prop_simple.md

> normalize > expressions > bindings > export > auto_ident_call_prop_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = b.$(1);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
