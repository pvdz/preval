# Preval test case

# assign_lhs.md

> Expr order > Assign lhs
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

#TODO

## Input

`````js filename=intro
let i = 0;
let j = ++i + i;
$(j);
`````

## Pre Normal

`````js filename=intro
let i = 0;
let j = ++i + i;
$(j);
`````

## Normalized

`````js filename=intro
let i = 0;
i = i + 1;
let tmpBinLhs = i;
let j = tmpBinLhs + i;
$(j);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
