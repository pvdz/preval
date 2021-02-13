# Preval test case

# auto_ident_computed_simple_simple.md

> normalize > expressions > bindings > export > auto_ident_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = b["c"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = b.c;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = b.c;
export { a };
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same