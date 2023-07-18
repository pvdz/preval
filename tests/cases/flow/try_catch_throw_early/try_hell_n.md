# Preval test case

# try_hell_n.md

> Flow > Try catch throw early > Try hell n
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      throw 'not me';
    } finally {
      return
    }
  }
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
      throw `not me`;
    } finally {
      return;
    }
  }
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  try {
    throw `not me`;
  } finally {
    return undefined;
  }
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
  try {
    throw `not me`;
  } finally {
    return undefined;
  }
  return undefined;
};
f();
considerMutated(0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    throw "not me";
  }
finally {
    return undefined;
  }
  return undefined;
},;
a();
considerMutated( 0 );
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
