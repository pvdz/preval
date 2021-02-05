# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_call_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = $($)(1);
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $($);
let a = tmpCallCallee(1);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee = $($);
let a = tmpCallCallee(1);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
