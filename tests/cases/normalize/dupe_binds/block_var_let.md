# Preval test case

# block_var_let.md

> Normalize > Dupe binds > Block var let
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
let f = function (x) {
  let x$1 = $(1);
  return x$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
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
