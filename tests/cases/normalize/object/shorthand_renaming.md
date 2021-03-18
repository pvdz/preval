# Preval test case

# shorthand_renaming.md

> Normalize > Object > Shorthand renaming
>
> The unique naming system must properly handle property shorthands

#TODO

## Input

`````js filename=intro
let f = function({x = 10}) {
  return x;
}
let g = function({x = 10}) {
  let y = {x}; // Make sure x gets renamed
  return [x, y];
}
$(x, y, f(), g());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x = 10 } = tmpParamPattern;
  return x;
};
let g = function (tmpParamPattern$1) {
  let { x$1 = 10 } = tmpParamPattern$1;
  let y = { x$1 };
  return [x$1, y];
};
$(x$2, y$1, f(), g());
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = 10;
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
let g = function (tmpParamPattern$1) {
  let bindingPatternObjRoot$1 = tmpParamPattern$1;
  let objPatternBeforeDefault$1 = bindingPatternObjRoot$1.x$1;
  let x$1 = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x$1 = 10;
  } else {
    x$1 = objPatternBeforeDefault$1;
  }
  let y = { x$1: x$1 };
  const tmpReturnArg = [x$1, y];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = x$2;
const tmpCalleeParam$1 = y$1;
const tmpCalleeParam$2 = f();
const tmpCalleeParam$3 = g();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
x$2;
y$1;
undefined.x;
throw '[Preval]: Can not reach here';
`````

## Globals

BAD@! Found 2 implicit global bindings:

x$2, y$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
