# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_array_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = [1, 2, 3];
$(a);
`````

## Normalized

`````js filename=intro
let a = [1, 2, 3];
$(a);
`````

## Output

`````js filename=intro
let a = [1, 2, 3];
$(a);
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same