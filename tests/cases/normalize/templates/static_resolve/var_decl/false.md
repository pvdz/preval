# Preval test case

# false.md

> Normalize > Templates > Static resolve > Var decl > False
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${false}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + $coerce(false, `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(false, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output

`````js filename=intro
$(`false`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "false" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
