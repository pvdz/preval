# Preval test case

# write_if_write_return_write.md

> Ref tracking > Write if write return write
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($) {
    x = $(2);
    return x;
  }
  $(x);
}
$(f);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  if ($) {
    x = $(2);
    return x;
  }
  $(x);
};
$(f);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  if ($) {
    x = $(2);
    return x;
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
  if ($) {
    const tmpClusterSSA_x = $(2);
    return tmpClusterSSA_x;
  } else {
    $(1);
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
  if ($) {
    const b = $( 2 );
    return b;
  }
  else {
    $( 1 );
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
