# Preval test case

# try_hell_m.md

> Flow > Try catch throw early > Try hell m
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
  foo: {
    try {
      break foo;
    } finally {
      return undefined;
    }
    console.log(x);
  }
  x = `fail`;
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  foo: {
    try {
      break foo;
    } finally {
      return undefined;
    }
    console.log(x);
  }
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
  foo:   {
    try {
      break foo;
    }
finally {
      return undefined;
    }
    console.log( b );
  }
  b = "fail";
  return undefined;
};
let b = 0;
a();
considerMutated( b );
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
