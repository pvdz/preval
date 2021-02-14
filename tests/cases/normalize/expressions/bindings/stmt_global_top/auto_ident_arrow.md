# Preval test case

# auto_ident_arrow.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_arrow
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = () => {};
$(a);
`````

## Normalized

`````js filename=intro
let a = () => {};
$(a);
`````

## Output

`````js filename=intro
let a = () => {};
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
