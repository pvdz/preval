# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Assign > Regex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${/foo/g}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = '' + /foo/g + '';
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = '';
const tmpBinBothRhs = /foo/g;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = tmpBinLhs + '';
$(x);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = /foo/g;
const tmpBinLhs = '' + tmpBinBothRhs;
$(tmpBinLhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
