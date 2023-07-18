# Preval test case

# init_call.md

> Normalize > Binding > Init call
>
> Binding declaration with a simple call should not be outlined

#TODO

## Input

`````js filename=intro
let x = $();
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $();
$(x);
`````

## Normalized

`````js filename=intro
let x = $();
$(x);
`````

## Output

`````js filename=intro
const x = $();
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
