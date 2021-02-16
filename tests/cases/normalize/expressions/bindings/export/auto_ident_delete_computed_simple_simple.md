# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > bindings > export > auto_ident_delete_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete arg["y"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = delete arg['y'];
export { a };
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = delete arg['y'];
export { a };
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
