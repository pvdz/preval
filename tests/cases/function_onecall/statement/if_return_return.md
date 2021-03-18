# Preval test case

# if_return_return.md

> Function onecall > Statement > If return return
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
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(1);
  }
  $(2);
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
}
$(2);
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
