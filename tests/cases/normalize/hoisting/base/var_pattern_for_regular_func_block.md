# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var [x] = [10];false;);
  }
  $(x);
}
f();
`````

## Normalized

`````js filename=intro
function f() {
  var x;
  $(x);
  {
    {
      const arrAssignPatternRhs = [10];
      const arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
    }
  }
  $(x);
}
f();
`````

## Output

`````js filename=intro
function f() {
  var x;
  $(x);
  const arrAssignPatternRhs = [10];
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
}
f();
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
