# Preval test case

# _base_nested.md

> Function onecall > Base nested
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    $(1);
  }
  g();
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function () {
    $(1);
  };
  g();
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function () {
    $(1);
  };
  g();
};
f();
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
