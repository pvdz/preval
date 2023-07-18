# Preval test case

# two.md

> Constants > Two
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar)
`````

## Pre Normal

`````js filename=intro
const foo = `five`;
const bar = `six`;
$(bar);
`````

## Normalized

`````js filename=intro
const foo = `five`;
const bar = `six`;
$(bar);
`````

## Output

`````js filename=intro
$(`six`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "six" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'six'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
