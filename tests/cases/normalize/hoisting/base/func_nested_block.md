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

## Normalized

`````js filename=intro
let g = function () {
  let f = function () {
    return x;
  };
  let x = 100;
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
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

Normalized calls: Same

Final output calls: Same
