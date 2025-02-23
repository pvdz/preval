# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { x: 1, y: 2, z: 3 })["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { x: 1, y: 2, z: 3 })[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
a = { x: 1, y: 2, z: 3 };
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
$Object_prototype.a;
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$Object_prototype.a;
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
