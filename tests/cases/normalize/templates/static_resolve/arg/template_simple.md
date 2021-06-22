# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Arg > Template simple
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${`I am a string`}`);
`````

## Pre Normal

`````js filename=intro
$(`` + String(`I am a string`) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `I am a string`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ``;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`I am a string`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'I am a string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
