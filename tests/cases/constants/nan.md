# Preval test case

# nan.md

> Constants > Nan
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar)
`````

## Pre Normal

`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar);
`````

## Normalized

`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar);
`````

## Output

`````js filename=intro
$(NaN);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
