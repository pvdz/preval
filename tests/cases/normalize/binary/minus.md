# Preval test case

# minus.md

> normalize > binary > minus
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(1 - null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = 1;
const tmpBinBothRhs = null;
const tmpCalleeParam = tmpBinBothLhs - tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = 1 - null;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
