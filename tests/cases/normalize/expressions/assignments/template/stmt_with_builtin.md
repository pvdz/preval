# Preval test case

# stmt_with_builtin.md

> Normalize > Expressions > Assignments > Template > Stmt with builtin
>
> A template that is a statement should be eliminated

#TODO

## Input

`````js filename=intro
`f${String}oo`;
$(x);
`````

## Pre Normal

`````js filename=intro
`f` + $coerce(String, `string`) + `oo`;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = `f`;
const tmpBinBothRhs = $coerce(String, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output

`````js filename=intro
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
