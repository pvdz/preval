# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > bindings > export > auto_ident_call_computed_c-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = (1, 2, $(b))[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
let a = tmpCallCompObj[tmpCallCompProp](1);
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
