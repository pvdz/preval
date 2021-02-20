# Preval test case

# func_global_top.md

> Normalize > Hoisting > Base > Func global top
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
$(f());
function f() {
  return 100;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return 100;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  return 100;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
