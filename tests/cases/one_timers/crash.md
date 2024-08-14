# Preval test case

# crash.md

> One timers > Crash
>
> This sample crashed at the time of writing

## Input

`````js filename=intro
const f = function() {
  $();
};
const g = function() {
  h();
};
f();
const h = function() {
  $();
};
g.prop = apparently_this_is_relevant; // Probably to keep the func around at least until the crash.
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $();
};
const g = function () {
  debugger;
  h();
};
f();
const h = function () {
  debugger;
  $();
};
g.prop = apparently_this_is_relevant;
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  $();
  return undefined;
};
const g = function () {
  debugger;
  h();
  return undefined;
};
f();
const h = function () {
  debugger;
  $();
  return undefined;
};
g.prop = apparently_this_is_relevant;
`````

## Output


`````js filename=intro
$();
apparently_this_is_relevant;
`````

## PST Output

With rename=true

`````js filename=intro
$();
apparently_this_is_relevant;
`````

## Globals

BAD@! Found 1 implicit global bindings:

apparently_this_is_relevant

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
