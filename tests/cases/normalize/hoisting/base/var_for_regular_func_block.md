# Preval test case

# var_for_regular_func_block.md

> Normalize > Hoisting > Base > Var for regular func block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var x = 10;false;);
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
  x = 10;
  $(x);
}
f();
`````

## Output

`````js filename=intro
function f() {
  $(undefined);
  $(10);
}
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
