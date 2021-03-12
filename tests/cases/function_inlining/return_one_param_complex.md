# Preval test case

# return_one_param_complex.md

> Function inlining > Return one param complex
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f($(10)));
`````

## Normalized

`````js filename=intro
let f = function (a) {
  return a;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (a) {
  return a;
};
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
