# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > bindings > export > auto_ident_delete_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

export let a = delete x["y"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = delete x['y'];
export { a };
$(a, x);
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
