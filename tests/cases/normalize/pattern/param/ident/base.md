# Preval test case

# base.md

> Normalize > Pattern > Param > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x) {
  return x;
}
$(f(1, 200));
`````

## Normalized

`````js filename=intro
let f = function (x) {
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (x) {
  return x;
};
const tmpCalleeParam = f(1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
