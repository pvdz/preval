# Preval test case

# func_param_let_shadow.md

> normalize > dupe_binds > func_param_let_shadow
>
> Func params can be shadowed by let 

Note that the outer `return` is dead code and so it's eliminated.

## Input

`````js filename=intro
function f(x) {
  {
    let x = $(1);
    return x;
  }
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f(x) {
  {
    let x_1 = $(1);
    return x_1;
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(x) {
  let x_1 = $(1);
  return x_1;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
