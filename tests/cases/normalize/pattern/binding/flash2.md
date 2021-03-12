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

## Normalized

`````js filename=intro
let x = function ($tdz$__pattern, tmpParamPattern) {
  let foo = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    foo = x$1;
  } else {
    foo = $tdz$__pattern;
  }
  let $tdz$__pattern_after_default = tmpParamPattern;
  let x$1 = $tdz$__pattern_after_default.x$1;
};
x();
`````

## Output

`````js filename=intro
const x = function ($tdz$__pattern, tmpParamPattern) {
  tmpParamPattern.x$1;
};
x();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')
