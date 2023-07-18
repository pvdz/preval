# Preval test case

# tostring_str_arg.md

> Normalize > Number > Tostring str arg
>
> Reading the toString method from a number. We know what that is.

#TODO

## Input

`````js filename=intro
const f = (31).toString('20');
$(f);
`````

## Pre Normal

`````js filename=intro
const f = (31).toString(`20`);
$(f);
`````

## Normalized

`````js filename=intro
const f = `1b`;
$(f);
`````

## Output

`````js filename=intro
$(`1b`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "1b" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
