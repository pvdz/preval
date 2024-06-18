# Preval test case

# string.md

> Normalize > Templates > Static resolve > Var decl > String
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${"why"}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `` + $coerce(`why`, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`why`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output


`````js filename=intro
$(`why`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "why" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'why'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
