# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Function declarations in a block are not hoisted

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
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
  function f() {
    return 100;
  }
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
}
g();
`````

## Output

`````js filename=intro
function g() {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
  function f() {
    return 100;
  }
  const tmpCalleeParam$1 = f();
  $(tmpCalleeParam$1);
}
g();
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
