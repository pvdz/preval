# Preval test case

# infinitely_testing_ident.md

> Tofix > Infinitely testing ident
>
> A loop that just tests for an ident to trigger tdz is not a loop

## Input

`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    s;
  }
  return undefined;
};
f();
f();
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    s;
  }
  return undefined;
};
f();
f();
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    s;
  }
  return undefined;
};
f();
f();
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    s;
  }
  return undefined;
};
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    s;
  }
  return undefined;
};
a();
a();
`````

## Globals

BAD@! Found 1 implicit global bindings:

s

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
