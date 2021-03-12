# Preval test case

# two_add.md

> Constants > Two add
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar + foo)
`````

## Pre Normal

`````js filename=intro
const foo = 'five';
const bar = 'six';
$(bar + foo);
`````

## Normalized

`````js filename=intro
const foo = 'five';
const bar = 'six';
const tmpCallCallee = $;
const tmpCalleeParam = bar + foo;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('sixfive');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'sixfive'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
