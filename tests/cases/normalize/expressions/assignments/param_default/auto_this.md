# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Param default > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = this)) {}
$(f());
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpthis = this;
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = tmpthis) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpthis = this;
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpthis;
    p = tmpthis;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  a = tmpthis;
  return undefined;
};
let a = { a: 999, b: 1000 };
f();
$(undefined);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
