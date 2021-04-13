# Preval test case

# func_nested_block.md

> Normalize > Hoisting > Base > Func nested block
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
function g() {
  {
    let x = 100;  
    function f() {
      return x;
    }
    $(f());
  }
}
g();
`````

## Pre Normal

`````js filename=intro
let g = function () {
  debugger;
  {
    let f = function () {
      debugger;
      return x;
    };
    let x = 100;
    $(f());
  }
};
g();
`````

## Normalized

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return x;
  };
  let x = 100;
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
g();
`````

## Output

`````js filename=intro
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
