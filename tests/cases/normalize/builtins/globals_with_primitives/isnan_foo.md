# Preval test case

# isnan_foo.md

> Normalize > Builtins > Globals with primitives > Isnan foo
>
> Calling isNaN on a value that is a NaN should invariantly return true

#TODO

## Input

`````js filename=intro
$(isNaN("foo"));
`````

## Pre Normal


`````js filename=intro
$(isNaN(`foo`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
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
