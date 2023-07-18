# Preval test case

# resolve_immediate_access.md

> Array > Static props > Resolve immediate access
>
> The immediate access should be resolved because we can guarantee the value

#TODO

## Input

`````js filename=intro
const arr = [1];
const v = arr[0];
$(v);
`````

## Pre Normal

`````js filename=intro
const arr = [1];
const v = arr[0];
$(v);
`````

## Normalized

`````js filename=intro
const arr = [1];
const v = arr[0];
$(v);
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
