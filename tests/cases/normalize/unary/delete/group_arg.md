# Preval test case

# group_arg.md

> Normalize > Unary > Delete > Group arg
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
$(delete (null, foo));
`````

## Pre Normal


`````js filename=intro
$(delete (null, foo));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
foo;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
foo;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
foo;
$( true );
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
