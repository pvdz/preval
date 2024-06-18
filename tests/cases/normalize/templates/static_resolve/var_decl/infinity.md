# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Var decl > Infinity
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${Infinity}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `` + $coerce(Infinity, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(Infinity, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output


`````js filename=intro
$(`Infinity`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "Infinity" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
