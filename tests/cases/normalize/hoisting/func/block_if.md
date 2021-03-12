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

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  let f = function () {
    $(1);
  };
  f();
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
