# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$({ ...(a = delete $(arg)["y"]) });
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$({ ...(a = delete $(arg)[`y`]) });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpClusterSSA_a = delete tmpDeleteObj.y;
const tmpCalleeParam = { ...tmpClusterSSA_a };
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = deleteb.y;
const d = { ... c };
$( d );
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: {}
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
