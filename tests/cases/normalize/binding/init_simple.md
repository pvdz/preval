# Preval test case

# init_simple.md

> Normalize > Binding > Init simple
>
> Binding declaration with a simple init should not be outlined

#TODO

## Input

`````js filename=intro
let x = Infinity;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = Infinity;
$(x);
`````

## Normalized

`````js filename=intro
let x = Infinity;
$(x);
`````

## Output

`````js filename=intro
$(Infinity);
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
