# Preval test case

# tostring_num_arg.md

> Normalize > Number > Tostring num arg
>
> Reading the toString method from a number. We know what that is.

#TODO

## Input

`````js filename=intro
const f = (31).toString(17);
$(f);
`````

## Pre Normal

`````js filename=intro
const f = (31).toString(17);
$(f);
`````

## Normalized

`````js filename=intro
const f = `1e`;
$(f);
`````

## Output

`````js filename=intro
$(`1e`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "1e" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1e'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
