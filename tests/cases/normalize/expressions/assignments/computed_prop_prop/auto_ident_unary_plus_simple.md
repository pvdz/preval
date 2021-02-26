# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary plus simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = +arg)];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = +arg;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output

`````js filename=intro
const obj = {};
obj[+1];
$(+1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
