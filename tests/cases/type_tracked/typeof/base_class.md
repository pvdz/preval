# Preval test case

# base_class.md

> Type tracked > Typeof > Base class
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = class {};
$(typeof x);
`````

## Pre Normal


`````js filename=intro
const x = class {};
$(typeof x);
`````

## Normalized


`````js filename=intro
const x = class {};
const tmpCallCallee = $;
const tmpCalleeParam = typeof x;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`function`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "function" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
