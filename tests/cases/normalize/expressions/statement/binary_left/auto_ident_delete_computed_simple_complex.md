# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > statement > binary_left > auto_ident_delete_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete arg[$("y")] + $(100);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
delete tmpDeleteCompObj[tmpDeleteCompProp];
$(100);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
delete tmpDeleteCompObj[tmpDeleteCompProp];
$(100);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 100
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same