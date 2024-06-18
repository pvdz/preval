# Preval test case

# implicit_global_crash_one_call.md

> Function trampoline > Call only > Implicit global crash one call
>
> The call should be inlined but the implicit globals should still crash at runtime

## Input

`````js filename=intro
const f = function () {
$(`inline me`);
  return undefined;
};
f(implicitGlobalShouldCrash, a, b, c);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $(`inline me`);
  return undefined;
};
f(implicitGlobalShouldCrash, a, b, c);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  $(`inline me`);
  return undefined;
};
f(implicitGlobalShouldCrash, a, b, c);
`````

## Output


`````js filename=intro
implicitGlobalShouldCrash;
a;
b;
c;
$(`inline me`);
`````

## PST Output

With rename=true

`````js filename=intro
implicitGlobalShouldCrash;
a;
b;
c;
$( "inline me" );
`````

## Globals

BAD@! Found 4 implicit global bindings:

implicitGlobalShouldCrash, a, b, c

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
