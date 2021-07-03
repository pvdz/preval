# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Assign > Template simple
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${`I am a string`}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `` + $coerce(`I am a string`, `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`I am a string`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
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
