# Preval test case

# static_push_one.md

> Obj mutation > Static push one
>
> Testing the inlining of objlit mutations

In this particular case the array could be initialized with the number immediately.

## Input

`````js filename=intro
const blob = {thing: 'woop'};
blob.thing = 'boing';
$(blob);
`````

## Pre Normal


`````js filename=intro
const blob = { thing: `woop` };
blob.thing = `boing`;
$(blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `boing` };
$(blob);
`````

## Output


`````js filename=intro
const blob /*:object*/ = { thing: `boing` };
$(blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { thing: "boing" };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
