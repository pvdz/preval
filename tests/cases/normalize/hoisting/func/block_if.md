# Preval test case

# block_if.md

> Normalize > Hoisting > Func > Block if
>
> Block hoisting func decls

#TODO

## Input

`````js filename=intro
if ($(1)) {
  f(); // Should be ok
  function f(){ $(1); } // this is let f = function(){}
}
`````

## Pre Normal

`````js filename=intro
if ($(1)) {
  let f = function () {
    debugger;
    $(1);
  };
  f();
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  let f = function () {
    debugger;
    $(1);
  };
  f();
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
