# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = [1, 2, 3])];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = [1, 2, 3])];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = [1, 2, 3];
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const obj /*:object*/ = {};
obj[`1,2,3`];
const a /*:array*/ = [1, 2, 3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
a[ "1,2,3" ];
const b = [ 1, 2, 3 ];
$( b );
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
