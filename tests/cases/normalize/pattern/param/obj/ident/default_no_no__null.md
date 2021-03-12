# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Param > Obj > Ident > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x }) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let x = bindingPatternObjRoot.x;
  return 'bad';
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  tmpParamPattern.x;
  return 'bad';
};
const tmpCalleeParam = f(null, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
