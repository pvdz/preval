# Preval test case

# auto_ident_object_empty.md

> normalize > expressions > assignments > stmt_global_top > auto_ident_object_empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = {};
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = {};
$(a);
`````

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same