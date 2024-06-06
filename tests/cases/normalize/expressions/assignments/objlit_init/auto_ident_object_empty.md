# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = {}) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = {}) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = {};
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = {};
const tmpCalleeParam = { x: a };
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = { x: a };
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{}' }
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
