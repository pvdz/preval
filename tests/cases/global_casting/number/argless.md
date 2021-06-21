# Preval test case

# argless.md

> Global casting > Number > Argless
>
> Calling global constructors to cast when the call is redundant should be eliminated

#TODO

## Input

`````js filename=intro
const y = Number();
$(y);
`````

## Pre Normal

`````js filename=intro
const y = Number();
$(y);
`````

## Normalized

`````js filename=intro
const y = Number();
$(y);
`````

## Output

`````js filename=intro
$(0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
