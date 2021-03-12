# Preval test case

# default_yes_no__null.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default yes no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] = $(['fail']) } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = null;
const objPatternBeforeDefault = $tdz$__pattern_after_default.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['fail'];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$('bad');
`````

## Output

`````js filename=intro
null.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
