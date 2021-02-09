# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Hosting in a block should end up in the parent

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
const tmpCallCallee = $;
tmpCallCallee(100);
const tmpCallCallee$1 = $;
tmpCallCallee$1(100);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
