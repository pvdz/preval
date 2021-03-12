# Preval test case

# flash2.md

> Normalize > Pattern > Binding > Flash2
>
> Regression hunting

## Input

`````js filename=intro
function x(foo = x, {x}) { 
  //return [foo, x]; 
}
x();
`````

## Pre Normal

`````js filename=intro
let x = function (tmpParamDefault, tmpParamPattern) {
  let foo = tmpParamDefault === undefined ? x$1 : tmpParamDefault;
  let { x$1 } = tmpParamPattern;
};
x();
`````

## Normalized

`````js filename=intro
let x = function (tmpParamDefault, tmpParamPattern) {
  let foo = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    foo = x$1;
  } else {
    foo = tmpParamDefault;
  }
  let bindingPatternObjRoot = tmpParamPattern;
  let x$1 = bindingPatternObjRoot.x$1;
};
x();
`````

## Output

`````js filename=intro
const x = function (tmpParamPattern) {
  tmpParamPattern.x$1;
};
x();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')
