# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > let > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let xyz = delete $(arg)[$("y")];
$(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(xyz);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(xyz);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: true
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
