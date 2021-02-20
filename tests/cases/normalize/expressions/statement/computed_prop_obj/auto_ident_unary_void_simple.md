# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(void arg)["a"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = undefined;
tmpCompObj.a;
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
undefined.a;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
