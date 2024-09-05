# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$({ x: (a = b[$("c")]) });
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$({ x: (a = b[$(`c`)]) });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
const a = b[tmpAssignRhsCompProp];
const tmpCalleeParam = { x: a };
$(tmpCalleeParam);
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = { x: c };
$( d );
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { x: '1' }
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
