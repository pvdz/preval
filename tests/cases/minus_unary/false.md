# Preval test case

# false.md

> Minus unary > False
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

Note: the -0 is observable. Object.is(0, !false) -> false

## Input

`````js filename=intro
$(-false)
`````

## Pre Normal

`````js filename=intro
$(-false);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-0);
`````

## PST Output

With rename=true

`````js filename=intro
$( -0 );
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
