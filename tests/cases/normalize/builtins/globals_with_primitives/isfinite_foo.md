# Preval test case

# isfinite_foo.md

> Normalize > Builtins > Globals with primitives > Isfinite foo
>
> Calling isFinite on a primitive should resolve

## Input

`````js filename=intro
$(isFinite("foo"));
`````

## Pre Normal


`````js filename=intro
$(isFinite(`foo`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
