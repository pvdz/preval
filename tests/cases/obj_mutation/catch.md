# Preval test case

# catch.md

> Obj mutation > Catch
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
try {
  $('try');
} catch {
  blob.thing = 'boing';
  $('catch');
}
$('after', blob)
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `woop` };
try {
  $(`try`);
} catch {
  blob.thing = `boing`;
  $(`catch`);
}
$(`after`, blob);
`````

## Normalized

`````js filename=intro
const blob = { thing: `woop` };
try {
  $(`try`);
} catch {
  blob.thing = `boing`;
  $(`catch`);
}
$(`after`, blob);
`````

## Output

`````js filename=intro
const blob = { thing: `woop` };
try {
  $(`try`);
} catch {
  blob.thing = `boing`;
  $(`catch`);
}
$(`after`, blob);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'try'
 - 2: 'after', { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
