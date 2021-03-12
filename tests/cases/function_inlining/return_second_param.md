# Preval test case

# return_second_param.md

> Function inlining > Return second param
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f(a, b) {
  return b;
}
$(f(10, 20));
`````

## Normalized

`````js filename=intro
let f = function (a, b) {
  return b;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(10, 20);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(20);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
