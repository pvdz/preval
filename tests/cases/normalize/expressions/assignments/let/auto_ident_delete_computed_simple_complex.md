# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > assignments > let > auto_ident_delete_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let xyz = (a = delete arg[$("y")]);
$(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let xyz = a;
$(xyz);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let xyz = a;
$(xyz);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: true
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same