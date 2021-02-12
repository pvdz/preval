# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_unary_void_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(void $(100))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
$(100);
const tmpCompObj = undefined;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
$(100);
const tmpCompObj = undefined;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
