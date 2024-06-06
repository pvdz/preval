# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = delete arg.y)];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = delete arg.y)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = delete arg.y;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const obj = {};
const a = delete arg.y;
obj[a];
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {};
const c = deletea.y;
b[ c ];
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
