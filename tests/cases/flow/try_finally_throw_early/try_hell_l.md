# Preval test case

# try_hell_l.md

> Flow > Try finally throw early > Try hell l
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      x = 1;
      break foo;
    } finally {
      throw_early
      x = 2;
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
      x = 1;
      break foo;
    } finally {
      throw_early;
      x = 2;
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
  const tmpAfterLabel = function () {
    debugger;
    x = `fail`;
    return undefined;
  };
  try {
    x = 1;
    const tmpReturnArg = tmpAfterLabel();
    return tmpReturnArg;
  } finally {
    throw_early;
    x = 2;
    return undefined;
  }
  console.log(x);
  const tmpReturnArg$1 = tmpAfterLabel();
  return tmpReturnArg$1;
};
let x = 0;
f();
considerMutated(x);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  x = 1;
  x = `fail`;
  try {
    return undefined;
  } finally {
    throw_early;
    x = 2;
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

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = 1;
  b = "fail";
  try {
    return undefined;
  }
finally {
    throw_early;
    b = 2;
    return undefined;
  }
  console.log( b );
  b = "fail";
  return undefined;
};
let b = 0;
a();
considerMutated( b );
`````

## Globals

BAD@! Found 2 implicit global bindings:

throw_early, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
