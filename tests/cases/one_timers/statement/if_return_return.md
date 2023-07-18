# Preval test case

# if_return_return.md

> One timers > Statement > If return return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  }
  $(2);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(1);
  }
  $(2);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(1);
  } else {
  }
  $(2);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
} else {
}
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
}
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
