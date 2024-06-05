# Preval test case

# phase1_label_store.md

> Normalize > Label > Phase1 label store
>
> Regression

This is a minimal test case that somehow uncovered that the label store was not properly set in phase1 (only in prepare).

## Input

`````js filename=intro
const f = function (x) {
  while (1) {
    let t = 1;
    if (3 === s) t = 0;
    stop: {
      break stop;
    }
  }
  x + 1;
};
f();
f();
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  while (1) {
    let t = 1;
    if (3 === s) t = 0;
    stop: {
      break stop;
    }
  }
  x + 1;
};
f();
f();
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  while (true) {
    let t = 1;
    const tmpIfTest = 3 === s;
    if (tmpIfTest) {
      t = 0;
    } else {
    }
  }
  x + 0;
  return undefined;
};
f();
f();
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  s;
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
  s;
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
