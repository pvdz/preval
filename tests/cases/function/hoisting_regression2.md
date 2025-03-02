# Preval test case

# hoisting_regression2.md

> Function > Hoisting regression2
>
>

## Input

`````js filename=intro
function f() {
  if ($) {
    return undefined;
  } else {
    
  }
  $('not a decl');
  let thisrefgetslost = $();
  function incorrectlyhoisted() {
    $(thisrefgetslost);
    return undefined;
  }
  return incorrectlyhoisted
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let incorrectlyhoisted = function () {
    debugger;
    $(thisrefgetslost);
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
  }
  $(`not a decl`);
  let thisrefgetslost = $();
  return incorrectlyhoisted;
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let incorrectlyhoisted = function () {
    debugger;
    $(thisrefgetslost);
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
    $(`not a decl`);
  }
  let thisrefgetslost = $();
  return incorrectlyhoisted;
};
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const incorrectlyhoisted /*:()=>undefined*/ = function () {
    debugger;
    $(thisrefgetslost);
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
    $(`not a decl`);
  }
  const thisrefgetslost /*:unknown*/ = $();
  return incorrectlyhoisted;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = function() {
    debugger;
    $( c );
    return undefined;
  };
  if ($) {
    return undefined;
  }
  else {
    $( "not a decl" );
  }
  const c = $();
  return b;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
