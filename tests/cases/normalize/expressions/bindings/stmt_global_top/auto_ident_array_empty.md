# Preval test case

# auto_ident_array_empty.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_array_empty
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = [];
$(a);
`````

## Normalized

`````js filename=intro
let a = [];
$(a);
`````

## Output

`````js filename=intro
let a = [];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
