# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_unary_tilde_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = ~arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = ~arg;
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = ~arg;
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: -2, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
