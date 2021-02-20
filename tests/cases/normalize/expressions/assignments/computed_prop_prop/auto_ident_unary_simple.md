# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = typeof x)];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = typeof x;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, x);
`````

## Output

`````js filename=intro
const obj = {};
obj.number;
$('number', 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
