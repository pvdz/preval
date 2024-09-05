# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$({ ...(a = b["c"]) });
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$({ ...(a = b[`c`]) });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b.c;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpCalleeParam = {};
$(tmpCalleeParam);
const b = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
$( a );
const b = { c: 1 };
$( 1, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
