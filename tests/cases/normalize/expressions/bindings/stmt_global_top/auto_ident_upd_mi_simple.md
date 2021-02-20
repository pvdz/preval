# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident upd mi simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = --b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
b = b - 1;
let a = b;
$(a, b);
`````

## Output

`````js filename=intro
$(0, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
