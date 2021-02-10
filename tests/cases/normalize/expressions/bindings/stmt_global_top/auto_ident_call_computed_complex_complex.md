# Preval test case

# auto_ident_call_computed_complex_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_call_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = $(b)[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
let a = tmpCallCompObj[tmpCallCompProp](1);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
