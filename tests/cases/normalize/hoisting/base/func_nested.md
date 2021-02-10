# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Hosting in a block should end up in the parent

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
function g() {
  function f() {
    return 100;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
}
g();
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
