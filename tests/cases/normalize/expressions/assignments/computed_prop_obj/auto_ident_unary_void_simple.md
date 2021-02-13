# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_unary_void_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = void arg)["a"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same