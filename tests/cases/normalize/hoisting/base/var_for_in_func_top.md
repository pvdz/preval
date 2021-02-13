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
  for (var x in {y: 100}) $(x, 'for');
  $(x);
}
f();
`````

## Normalized

`````js filename=intro
function f() {
  var x;
  $(x);
  const tmpForInRhs = { y: 100 };
  for (x in tmpForInRhs) {
    $(x, 'for');
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
  const tmpForInRhs = { y: 100 };
  for (x in tmpForInRhs) {
    $(x, 'for');
  }
  $(x);
}
f();
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same