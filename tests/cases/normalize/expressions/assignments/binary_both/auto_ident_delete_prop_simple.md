# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg.y) + (a = delete arg.y));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete arg.y) + (a = delete arg.y));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = delete arg.y;
let tmpBinBothLhs = a;
a = delete arg.y;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
const tmpClusterSSA_a = delete arg.y;
const tmpCalleeParam = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = deletea.y;
const c = deletea.y;
const d = b + c;
$( d );
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
