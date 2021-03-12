# Preval test case

# return_second_param_complex.md

> Function inlining > Return second param complex
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f(a, b) {
  return b;
}
$(f($(10), $(20)));
`````

## Normalized

`````js filename=intro
let f = function (a, b) {
  return b;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$2 = $(20);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (a, b) {
  return b;
};
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$2 = $(20);
const tmpCalleeParam = f(tmpCalleeParam$1, tmpCalleeParam$2);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
