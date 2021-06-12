# Preval test case

# one.md

> Normalize > Templates > Static resolve > Var decl > One
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${1}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = '' + 1 + '';
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinLhs = '1';
let x = tmpBinLhs + '';
$(x);
`````

## Output

`````js filename=intro
$('1');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
