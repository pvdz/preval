# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Var decl > Infinity
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${Infinity}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = '' + Infinity + '';
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinLhs = 'Infinity';
let x = tmpBinLhs + '';
$(x);
`````

## Output

`````js filename=intro
$('Infinity');
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
