# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { b: $(1) })];
a.b = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { b: $(1) })];
a.b = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## Output


`````js filename=intro
const obj = {};
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
obj[a];
const tmpAssignMemRhs = $(2);
a.b = tmpAssignMemRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = $( 1 );
const c = { b: b };
a[ c ];
const d = $( 2 );
c.b = d;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
