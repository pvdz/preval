# Preval test case

# write_if_return.md

> Ref tracking > Write if return
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    return
  }
  $(x);
}
$(f);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    return;
  }
  $(x);
};
$(f);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
$(f);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  if ($) {
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if ($) {
    return undefined;
  }
  else {
    $( b );
    return undefined;
  }
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
