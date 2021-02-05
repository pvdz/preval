# Preval test case

# base.md

> normalize > pattern >  > param > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(...x) {
  return x;
}
$(f(1, 2, 3));
`````

## Normalized

`````js filename=intro
function f(...x) {
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(...x) {
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
