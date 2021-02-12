# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > let > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
let xyz = delete $(x)["y"];
$(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(xyz);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(xyz);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
