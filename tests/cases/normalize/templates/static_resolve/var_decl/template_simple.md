# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Var decl > Template simple
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${`I am a string`}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + String(`I am a string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `I am a string`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = tmpBinLhs + ``;
$(x);
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
