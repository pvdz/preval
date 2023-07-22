# Preval test case

# write_if_return_write.md

> Ref tracking > Write if return write
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($) {
    return x;
  } else {
    x = $(2);
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
    return x;
  } else {
    x = $(2);
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
    return x;
  } else {
    x = $(2);
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
    return 1;
  } else {
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
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
    return 1;
  }
  else {
    const b = $( 2 );
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
