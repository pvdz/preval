# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_delete_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = delete $(arg).y)];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
