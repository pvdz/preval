# Preval test case

# Infinity.md

> Constants > Infinity
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = Infinity;
const bar = foo;
$(bar)
`````

## Pre Normal

`````js filename=intro
const foo = Infinity;
const bar = foo;
$(bar);
`````

## Normalized

`````js filename=intro
const foo = Infinity;
const bar = foo;
$(bar);
`````

## Output

`````js filename=intro
$(Infinity);
`````

## PST Output

With rename=true

`````js filename=intro
$( Infinity );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
