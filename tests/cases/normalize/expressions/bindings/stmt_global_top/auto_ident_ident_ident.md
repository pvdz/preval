# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_ident_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = (b = 2);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a;
b = 2;
a = 2;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let c = 2;
let a;
b = 2;
a = 2;
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
