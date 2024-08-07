# Preval test case

# assign.md

> Expr order > Assign
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let i = 0;
let j = i + ++i;
$(j);
`````

## Pre Normal


`````js filename=intro
let i = 0;
let j = i + ++i;
$(j);
`````

## Normalized


`````js filename=intro
let i = 0;
const tmpBinBothLhs = i;
i = i + 1;
let tmpBinBothRhs = i;
let j = tmpBinBothLhs + tmpBinBothRhs;
$(j);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
