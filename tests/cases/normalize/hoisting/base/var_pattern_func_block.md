# Preval test case

# func_block.md

> normalize > hoisting > func_block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    var [x] = [10];
  }
  $(x);
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var x;
  $(x);
  {
    const arrAssignPatternRhs = [10];
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
  }
  $(x);
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  var x;
  $(x);
  {
    const arrAssignPatternRhs = [10];
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
  }
  $(x);
  return x;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same