# Preval test case

# return_lit.md

> Function inlining > Return lit
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f() {
  return 10;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  return 10;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  return 10;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
