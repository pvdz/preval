# Preval test case

# try_catch.md

> Obj mutation > Try catch
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
try {
  blob.thing = 'boing';
} catch {
  blob.thing = 'boom';
}
$('after', blob)
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch (e) {
  blob.thing = `boom`;
}
$(`after`, blob);
`````

## Normalized

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch (e) {
  blob.thing = `boom`;
}
$(`after`, blob);
`````

## Output

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch (e) {
  blob.thing = `boom`;
}
$(`after`, blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { thing: "woop" };
try {
  a.thing = "boing";
}
catch (e) {
  a.thing = "boom";
}
$( "after", a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 'after', { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
