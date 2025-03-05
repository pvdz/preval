# Preval test case

# false.md

> Excl > False
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!false)
`````

## Pre Normal


`````js filename=intro
$(!false);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
