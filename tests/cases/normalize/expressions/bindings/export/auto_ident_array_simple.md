# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > bindings > export > auto_ident_array_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = [1, 2, 3];
$(a);
`````

## Normalized

`````js filename=intro
let a = [1, 2, 3];
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
