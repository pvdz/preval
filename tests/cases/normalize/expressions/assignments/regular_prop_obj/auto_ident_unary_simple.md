# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = typeof x).a;
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = typeof x).a;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
a = typeof x;
let tmpCompObj = a;
tmpCompObj.a;
$(a, x);
`````

## Output

`````js filename=intro
`number`.a;
$(`number`, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
