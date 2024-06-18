# Preval test case

# stmt_with_unknown.md

> Normalize > Expressions > Assignments > Template > Stmt with unknown
>
> A template that is a statement should be eliminated

## Input

`````js filename=intro
`f${x}oo`;
$(x);
`````

## Pre Normal


`````js filename=intro
`f` + $coerce(x, `string`) + `oo`;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = `f`;
const tmpBinBothRhs = $coerce(x, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output


`````js filename=intro
$coerce(x, `string`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$coerce( x, "string" );
$( x );
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
