# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b)["a"];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = b)[`a`];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
a = b;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output


`````js filename=intro
(1).a;
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
1.a;
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
