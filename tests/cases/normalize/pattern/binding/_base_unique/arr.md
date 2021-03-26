# Preval test case

# arr.md

> Normalize > Pattern > Binding > Base unique > Arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; } 
const [ x ] = [ 100 ];
{ let x = 1; }
$(x);
`````

## Pre Normal

`````js filename=intro
{
  let x$1 = 1;
}
const [x] = [100];
{
  let x$3 = 1;
}
$(x);
`````

## Normalized

`````js filename=intro
let x$1 = 1;
const bindingPatternArrRoot = [100];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
let x$3 = 1;
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
