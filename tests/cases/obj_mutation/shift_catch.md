# Preval test case

# shift_catch.md

> Obj mutation > Shift catch
>
> Testing the inlining of objlit mutations

#TODO

## Input

`````js filename=intro
const blob = {thing: 'woop'};
try {
} catch {
  blob.thing = 'boing';
}
$('after', blob)
`````

## Pre Normal


`````js filename=intro
const blob = { thing: `woop` };
try {
} catch (e) {
  blob.thing = `boing`;
}
$(`after`, blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `woop` };
$(`after`, blob);
`````

## Output


`````js filename=intro
const blob = { thing: `woop` };
$(`after`, blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { thing: "woop" };
$( "after", a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'after', { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
