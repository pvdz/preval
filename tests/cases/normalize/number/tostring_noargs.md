# Preval test case

# tostring_noargs.md

> Normalize > Number > Tostring noargs
>
> Reading the toString method from a number. We know what that is.

#TODO

## Input

`````js filename=intro
const f = (31).toString();
$(f);
`````

## Pre Normal


`````js filename=intro
const f = (31).toString();
$(f);
`````

## Normalized


`````js filename=intro
const f = `31`;
$(f);
`````

## Output


`````js filename=intro
$(`31`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "31" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '31'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
