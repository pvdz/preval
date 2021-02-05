# Preval test case

# diff_objs.md

> eq > diff_objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
$({} != {});
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = {};
const tmpBinBothRhs = {};
const tmpCalleeParam = tmpBinBothLhs != tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = {};
const tmpBinBothRhs = {};
const tmpCalleeParam = tmpBinBothLhs != tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
