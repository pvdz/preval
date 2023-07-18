# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) }).a;
a.b = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) }).a;
a.b = $(2);
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
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
$ObjectPrototype.a;
const tmpAssignMemRhs = $(2);
const a = { b: tmpObjLitVal };
a.b = tmpAssignMemRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$ObjectPrototype.a;
const b = $( 2 );
const c = { b: a };
c.b = b;
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
