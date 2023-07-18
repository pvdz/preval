# Preval test case

# implicit_global_crash.md

> Function trampoline > Call only > Implicit global crash
>
> The call should be inlined but the implicit globals should still crash at runtime

#TODO

## Input

`````js filename=intro
function f(w, x, y, z) {
  $('inline me');
}
f(implicitGlobalShouldCrash, a, b, c);
f(implicitGlobalShouldCrash, a, b, c);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1, $$2, $$3) {
  let w = $$0;
  let x = $$1;
  let y = $$2;
  let z = $$3;
  debugger;
  $(`inline me`);
};
f(implicitGlobalShouldCrash, a, b, c);
f(implicitGlobalShouldCrash, a, b, c);
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1, $$2, $$3) {
  let w = $$0;
  let x = $$1;
  let y = $$2;
  let z = $$3;
  debugger;
  $(`inline me`);
  return undefined;
};
f(implicitGlobalShouldCrash, a, b, c);
f(implicitGlobalShouldCrash, a, b, c);
`````

## Output

`````js filename=intro
$(`inline me`);
$(`inline me`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "inline me" );
$( "inline me" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'inline me'
 - 2: 'inline me'
 - eval returned: undefined
