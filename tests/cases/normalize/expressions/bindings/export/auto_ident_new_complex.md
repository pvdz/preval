# Preval test case

# auto_ident_new_complex.md

> normalize > expressions > bindings > export > auto_ident_new_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = new ($($))(1);
$(a);
`````

## Normalized

`````js filename=intro
const tmpNewCallee = $($);
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same