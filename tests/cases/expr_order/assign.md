# Preval test case

# order.md

> assignment > order
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

#TODO

## Input

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
let i = 0;
const tmpBinBothLhs = i;
i = i + 1;
const tmpBinBothRhs = i;
const j = tmpBinBothLhs + tmpBinBothRhs;
$(j);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
