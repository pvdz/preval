# Preval test case

# func.md

> Try > Finally > Func
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  $(1);
  const f = function() {
    throw 'test';
  }
  $(f);
} finally {
  $(2);
}
`````

## Pre Normal

`````js filename=intro
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(1);
      const f = function () {
        debugger;
        throw `test`;
      };
      $(f);
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  {
    $(2);
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  }
}
`````

## Normalized

`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
  const f = function () {
    debugger;
    throw `test`;
  };
  $(f);
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## Output

`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
  const f = function () {
    debugger;
    throw `test`;
  };
  $(f);
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
let b = undefined;
try {
  $( 1 );
  const c = function() {
    debugger;
    throw "test";
  };
  $( c );
}
catch ($finalImplicit) {
  a = true;
  b = $finalImplicit;
}
$( 2 );
if (a) {
  throw b;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

$finalImplicit

## Result

Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
