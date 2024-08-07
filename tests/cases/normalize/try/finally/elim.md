# Preval test case

# elim.md

> Normalize > Try > Finally > Elim
>
> Can we safely eliminate finally?

Narrator: no.

## Input

`````js filename=intro
function f() {
  try {
    $(1);
    fail;
    $('fail');
  } finally {
    $(3);
  }
  $('fail2');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
        $(1);
        fail;
        $(`fail`);
      } catch ($finalImplicit) {
        $(3);
        throw $finalImplicit;
      }
    }
    {
      $(3);
    }
    if ($implicitThrow) throw $finalCatchArg;
    else {
    }
  }
  $(`fail2`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  try {
    $(1);
    fail;
    $(`fail`);
  } catch ($finalImplicit) {
    $(3);
    throw $finalImplicit;
  }
  $(3);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    $(`fail2`);
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
try {
  $(1);
  fail;
  $(`fail`);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
$(`fail2`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
  fail;
  $( "fail" );
}
catch (a) {
  $( 3 );
  throw a;
}
$( 3 );
$( "fail2" );
$( undefined );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
