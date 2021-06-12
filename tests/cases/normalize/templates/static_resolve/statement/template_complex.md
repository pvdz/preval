# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Statement > Template complex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${`a ${$(1)} b`}`;
`````

## Pre Normal

`````js filename=intro
'' + ('a ' + $(1) + ' b') + '';
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = '';
const tmpBinBothLhs$1 = 'a ';
const tmpBinBothRhs$1 = $(1);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs = tmpBinLhs$1 + ' b';
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
tmpBinLhs + '';
`````

## Output

`````js filename=intro
const tmpBinBothRhs$1 = $(1);
const tmpBinLhs$1 = 'a ' + tmpBinBothRhs$1;
tmpBinLhs$1 + ' b';
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
