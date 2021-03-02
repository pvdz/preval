# Preval test case

# func_nested_top.md

> Normalize > Hoisting > Base > Func nested top
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
function g() {
  $(f());
  function f() {
    return 100;
  }
  $(f());
}
g();
`````

## Normalized

`````js filename=intro
let g = function () {
  let f = function () {
    return 100;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
};
g();
`````

## Output

`````js filename=intro
const g = function () {
  $(100);
  $(100);
};
g();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
