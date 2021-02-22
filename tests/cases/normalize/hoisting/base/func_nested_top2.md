# Preval test case

# func_nested_top2.md

> Normalize > Hoisting > Base > Func nested top2
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
g();
function g() {
  f();
  function f() {
    return 100;
  }
}
`````

## Normalized

`````js filename=intro
function g() {
  function f() {
    return 100;
  }
  f();
}
g();
`````

## Output

`````js filename=intro
function g() {
  function f() {
    return 100;
  }
  f();
}
g();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same