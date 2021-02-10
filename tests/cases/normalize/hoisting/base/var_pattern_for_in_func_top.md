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
  for (var [x] in {y: 100}) $(x, 'for');
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
  {
    let tmpForInLhsNode;
    for (tmpForInLhsNode in tmpForInRhs) {
      const arrAssignPatternRhs = tmpForInLhsNode;
      const arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      $(x, 'for');
    }
  }
  $(x);
}
f();
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
