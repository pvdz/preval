# Preval test case

# _base_nested.md

> Function onecall > Var > Base nested
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
const x = f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function () {
    $(1);
  };
  g();
};
const x = f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function () {
    $(1);
  };
  g();
};
const x = f();
$(x);
`````

## Output

`````js filename=intro
$(1);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
