# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = void arg)];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = void arg)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = undefined;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output


`````js filename=intro
$Object_prototype.undefined;
$(undefined, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$Object_prototype.undefined;
$( undefined, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
