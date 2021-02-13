# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > assignments > let > auto_ident_unary_tilde_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = ~arg);
$(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = ~arg;
let xyz = a;
$(xyz);
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = ~1;
let xyz = a;
$(xyz);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: -2
 - 2: -2, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
