# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
[1, 2, 3].a;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
[1, 2, 3].a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = [1, 2, 3];
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCompObj = [1, 2, 3];
tmpCompObj.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ 1, 2, 3 ];
b.a;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
