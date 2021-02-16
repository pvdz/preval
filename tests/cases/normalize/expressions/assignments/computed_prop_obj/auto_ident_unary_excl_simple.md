# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_unary_excl_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = !arg)["a"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
a = !arg;
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const obj = {};
a = false;
const tmpCompObj = a;
tmpCompObj.a;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
