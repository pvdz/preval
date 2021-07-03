# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Assign > Undefined
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${undefined}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `` + $coerce(undefined, `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(undefined, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output

`````js filename=intro
$(`undefined`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
