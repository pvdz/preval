# Preval test case

# return_string.md

> function > return_string
>
> A function that returns NaN

## Input

`````js filename=intro
function f() {
  return NaN;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return NaN;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  return NaN;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
