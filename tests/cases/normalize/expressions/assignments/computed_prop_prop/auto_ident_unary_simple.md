# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = typeof x)];
$(a, x);
`````

## Pre Normal


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
$Object_prototype.number;
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$Object_prototype.number;
$( "number", 1 );
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
