# Preval test case

# diff_objs.md

> Binary > Lt eq > Diff objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$({} <= {});
`````

## Pre Normal


`````js filename=intro
$({} <= {});
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = {};
const tmpBinBothRhs = {};
const tmpCalleeParam = tmpBinBothLhs <= tmpBinBothRhs;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:object*/ = {};
const tmpBinBothRhs /*:object*/ = {};
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs <= tmpBinBothRhs;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = {};
const c = a <= b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
