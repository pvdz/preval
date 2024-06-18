# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = !arg).a;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = !arg).a;
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
false.a;
$(false, 1);
`````

## PST Output

With rename=true

`````js filename=intro
false.a;
$( false, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
