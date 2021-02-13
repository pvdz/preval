# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > binary_both > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete $(arg)[$("y")] + delete $(arg)[$("y")];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 = $(arg);
const tmpDeleteCompProp$1 = $('y');
delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 = $(arg);
const tmpDeleteCompProp$1 = $('y');
delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: {}
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same