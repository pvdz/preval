# Preval test case

# simple_implicit_write.md

> Globals > Simple implicit write
>
> Writing to an implicit global

## Input

`````js filename=intro
$(a = 5);
`````

## Pre Normal


`````js filename=intro
$((a = 5));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
a = 5;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
a = 5;
const tmpCalleeParam /*:unknown*/ = a;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
a = 5;
const b = a;
$( b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
