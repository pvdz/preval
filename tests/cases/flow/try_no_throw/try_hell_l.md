# Preval test case

# try_hell_l.md

> Flow > Try no throw > Try hell l
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      break foo;
    } finally {
      return
    }
    // This is dead code regardless?
    console.log(x);
  }
  // Dead code because the finalizer return overrides the break
  x = 'fail';
}
f();
considerMutated(x) // always false
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    try {
      break foo;
    } finally {
      return;
    }
    console.log(x);
  }
  x = `fail`;
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpLabeledBlockFunc = function () {
    debugger;
    try {
      const tmpReturnArg = tmpAfterLabel();
      return tmpReturnArg;
    } finally {
      return undefined;
    }
    console.log(x);
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
  };
  const tmpAfterLabel = function () {
    debugger;
    x = `fail`;
    return undefined;
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc();
  return tmpReturnArg$3;
};
let x = 0;
f();
considerMutated(x);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  try {
    x = `fail`;
    return undefined;
  } finally {
    return undefined;
  }
  console.log(x);
  x = `fail`;
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
