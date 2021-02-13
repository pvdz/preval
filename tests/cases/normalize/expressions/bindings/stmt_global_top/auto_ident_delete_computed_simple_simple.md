# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_delete_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = delete arg["y"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = delete arg['y'];
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = delete arg['y'];
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same