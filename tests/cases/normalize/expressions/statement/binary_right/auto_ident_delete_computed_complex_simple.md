# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > binary_right > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) + delete $(arg)["y"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(100);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
delete tmpDeleteCompObj[tmpDeleteCompProp];
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(100);
const tmpDeleteCompObj = $(arg);
delete tmpDeleteCompObj['y'];
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same