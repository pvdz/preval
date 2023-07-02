# Preval test case

# try.md

> Obj mutation > Try
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
try {
  blob.thing = 'boing';
} catch {
}
$('after', blob)
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch {}
$(`after`, blob);
`````

## Normalized

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch {}
$(`after`, blob);
`````

## Output

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch {}
$(`after`, blob);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'after', { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
