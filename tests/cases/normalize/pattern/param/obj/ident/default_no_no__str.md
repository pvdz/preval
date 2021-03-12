# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Obj > Ident > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let x = bindingPatternObjRoot.x;
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f('abc', 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const x = tmpParamPattern.x;
  return x;
};
const tmpCalleeParam = f('abc', 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
