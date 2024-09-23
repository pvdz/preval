# Preval test case

# try.md

> Function splitting > Try
>
> A function that tests on a param and has two separate code paths based on that test might be splittable if we know all the args.

This exception was specifically aimed towards an obfuscator

## Input

`````js filename=intro
function f(a) {
  try {
    if (a) {
      $('then');
    } else {
      $('else');
    }
  } catch {}
}

f(0);
f('ok');
f(true);
f(false);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  try {
    if (a) {
      $(`then`);
    } else {
      $(`else`);
    }
  } catch (e) {}
};
f(0);
f(`ok`);
f(true);
f(false);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  try {
    if (a) {
      $(`then`);
    } else {
      $(`else`);
    }
  } catch (e) {}
  return undefined;
};
f(0);
f(`ok`);
f(true);
f(false);
`````

## Output


`````js filename=intro
const tmpSplitTruthy /*:()=>*/ = function () {
  debugger;
  try {
    $(`then`);
  } catch (tmpCatchParam) {}
  return undefined;
};
const tmpSplitFalsy /*:()=>*/ = function () {
  debugger;
  try {
    $(`else`);
  } catch (tmpCatchParam$1) {}
  return undefined;
};
tmpSplitFalsy();
tmpSplitTruthy();
tmpSplitTruthy();
tmpSplitFalsy();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    $( "then" );
  }
  catch (b) {

  }
  return undefined;
};
const c = function() {
  debugger;
  try {
    $( "else" );
  }
  catch (d) {

  }
  return undefined;
};
c();
a();
a();
c();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'else'
 - 2: 'then'
 - 3: 'then'
 - 4: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
