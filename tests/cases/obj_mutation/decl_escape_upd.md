# Preval test case

# decl_escape_upd.md

> Obj mutation > Decl escape upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
$(blob);
blob.thing = 'boing';
$(blob);
`````

## Pre Normal


`````js filename=intro
const blob = { thing: `woop` };
$(blob);
blob.thing = `boing`;
$(blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `woop` };
$(blob);
blob.thing = `boing`;
$(blob);
`````

## Output


`````js filename=intro
const blob /*:object*/ = { thing: `woop` };
$(blob);
blob.thing = `boing`;
$(blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { thing: "woop" };
$( a );
a.thing = "boing";
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { thing: '"woop"' }
 - 2: { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
