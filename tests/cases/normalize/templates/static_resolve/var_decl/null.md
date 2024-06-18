# Preval test case

# null.md

> Normalize > Templates > Static resolve > Var decl > Null
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${null}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `` + $coerce(null, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(null, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output


`````js filename=intro
$(`null`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "null" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'null'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
