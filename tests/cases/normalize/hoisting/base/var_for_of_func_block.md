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
    for (var x of [100]) $(x, 'for');
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
    const tmpForOfRhs = [100];
    for (x of tmpForOfRhs) {
      $(x, 'for');
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
  const tmpForOfRhs = [100];
  for (x of tmpForOfRhs) {
    $(x, 'for');
  }
  $(x);
}
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
