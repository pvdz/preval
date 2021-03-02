# Preval test case

# return_infinity.md

> Function > Return infinity
>
> A function that returns Infinity

## Input

`````js filename=intro
function f() {
  return Infinity;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  return Infinity;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(Infinity);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
