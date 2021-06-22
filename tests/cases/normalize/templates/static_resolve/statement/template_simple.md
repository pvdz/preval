# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Statement > Template simple
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${`I am a string`}`;
`````

## Pre Normal

`````js filename=intro
`` + String(`I am a string`) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `I am a string`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
tmpBinLhs + ``;
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
