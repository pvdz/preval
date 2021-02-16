# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
{
  let x = 100;
  function f() {
    return x;
  }
  $(f());
}
`````

## Normalized

`````js filename=intro
{
  let x = 100;
  function f() {
    return x;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output

`````js filename=intro
function f() {
  return 100;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
