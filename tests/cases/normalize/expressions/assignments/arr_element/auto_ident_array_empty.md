# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Arr element > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) + (a = []));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) + (a = []));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpBinBothLhs = a;
a = [];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(``);
const tmpClusterSSA_a /*:array*/ = [];
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( "" );
const a = [];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
