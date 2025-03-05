# Preval test case

# nested_simple.md

> Normalize > Expressions > Nested simple
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = 10, b = 20, c = 30;
$(a = b = c);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = 10), (b = 20), (c = 30);
$((a = b = c));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = 10;
b = 20;
c = 30;
b = c;
a = c;
let tmpCalleeParam = a;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(30);
`````

## PST Output

With rename=true

`````js filename=intro
$( 30 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
