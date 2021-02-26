# Preval test case

# default_yes_no_no__null.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault;
  }
  return 'bad';
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const objPatternBeforeDefault = objPatternNoDefault.y;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    $('fail');
  }
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
