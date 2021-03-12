# Preval test case

# func_block_if.md

> Normalize > Hoisting > Func > Func block if
>
> Block hoisting func decls

#TODO

## Input

`````js filename=intro
function g() {
  if ($(1)) {
    f(); // Should be ok
    function f(){ $(1); }
  }
}
g();
`````

## Normalized

`````js filename=intro
let g = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let f = function () {
      $(1);
    };
    f();
  }
};
g();
`````

## Output

`````js filename=intro
const g = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(1);
  }
};
g();
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
