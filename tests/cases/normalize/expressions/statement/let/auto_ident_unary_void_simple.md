# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > statement > let > auto_ident_unary_void_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let xyz = void x;
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz = undefined;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz = undefined;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
