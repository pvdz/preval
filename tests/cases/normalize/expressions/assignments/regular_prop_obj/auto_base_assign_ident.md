# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b = $(2)).a;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = b = $(2)).a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
const tmpNestedComplexRhs = $(2);
tmpNestedComplexRhs.a;
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
