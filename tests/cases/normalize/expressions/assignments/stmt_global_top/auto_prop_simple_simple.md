# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Stmt global top > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = { b: $(1) };
a.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
a = { b: $(1) };
a.b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
a.b = 2;
$(a);
`````

## Output


`````js filename=intro
$(1);
const a /*:object*/ = { b: 2 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { b: 2 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
