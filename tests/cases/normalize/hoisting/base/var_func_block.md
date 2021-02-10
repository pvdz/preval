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
    var x = 10;
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
    x = 10;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
