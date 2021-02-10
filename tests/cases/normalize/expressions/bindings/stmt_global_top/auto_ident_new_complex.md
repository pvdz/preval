# Preval test case

# auto_ident_new_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_new_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = new ($($))(1);
$(a);
`````

## Normalized

`````js filename=intro
const tmpNewCallee = $($);
let a = new tmpNewCallee(1);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
