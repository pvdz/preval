# Preval test case

# diff_objs.md

> Binary > Neq strong > Diff objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
$({} !== {});
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = {};
const tmpBinBothRhs = {};
const tmpCalleeParam = tmpBinBothLhs !== tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = {};
const tmpBinBothRhs = {};
const tmpCalleeParam = tmpBinBothLhs !== tmpBinBothRhs;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
