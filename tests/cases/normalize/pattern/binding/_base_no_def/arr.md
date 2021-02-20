# Preval test case

# arr.md

> Normalize > Pattern > Binding > Base no def > Arr
>
> Testing simple pattern normalizations

See https://pvdz.ee/weblog/438 on discussions on transforming this

## Input

`````js filename=intro
const [ x ] = [ 100 ];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [100];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [100];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
