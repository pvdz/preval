# Preval test case

# inc.md

> Array reads > Inc
>
> Inlining array properties

(This actually caused a syntax erorr at one point, oops)

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(++arr[0]);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(++arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCallCallee = $;
const tmpBinLhs = arr[0];
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
arr[0] = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
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
