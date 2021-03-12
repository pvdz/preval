# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = void $(100))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = void $(100))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
$(100);
a = undefined;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
$(100);
obj[undefined];
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
