# Preval test case

# boolean_str_50foo.md

> Array > Static context > Boolean str 50foo
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(Boolean(['50foo']));
`````

## Pre Normal


`````js filename=intro
$(Boolean([`50foo`]));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [`50foo`];
const tmpCalleeParam = Boolean(tmpCalleeParam$1);
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
