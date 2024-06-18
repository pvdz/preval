# Preval test case

# string_foo.md

> Normalize > Builtins > Globals with primitives > String foo
>
> Calling String on a primitive should resolve

## Input

`````js filename=intro
$(String("foo"));
`````

## Pre Normal


`````js filename=intro
$(String(`foo`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `foo`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
