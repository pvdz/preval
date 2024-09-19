# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) }).a;
a[$("b")] = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) }).a;
a[$(`b`)] = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCompObj = a;
tmpCompObj.a;
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
$ObjectPrototype.a;
const tmpAssignComMemLhsProp = $(`b`);
const a /*:object*/ = { b: tmpObjLitVal };
a[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$ObjectPrototype.a;
const b = $( "b" );
const c = { b: a };
c[b] = 2;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'b'
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
