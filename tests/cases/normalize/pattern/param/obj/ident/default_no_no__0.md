# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > ident > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let x = tmpParamPattern.x;
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(0, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
