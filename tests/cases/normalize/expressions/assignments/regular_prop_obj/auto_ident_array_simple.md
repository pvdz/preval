# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = [1, 2, 3]).a;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = [1, 2, 3]).a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
a = [1, 2, 3];
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const a = [1, 2, 3];
a.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
a.a;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
