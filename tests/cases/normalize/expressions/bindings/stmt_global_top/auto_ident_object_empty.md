# Preval test case

# auto_ident_object_empty.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_object_empty
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = {};
$(a);
`````

## Normalized

`````js filename=intro
let a = {};
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
