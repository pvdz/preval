# Preval test case

# in_func.md

> Tdz > In func
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
  s;
  return undefined;
};
f();
f();
`````

## Output


`````js filename=intro
s;
`````

## PST Output

With rename=true

`````js filename=intro
s;
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
