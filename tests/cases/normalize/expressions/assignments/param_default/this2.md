# Preval test case

# this2.md

> Normalize > Expressions > Assignments > Param default > This2
>
> Normalization of assignments should work the same everywhere they are

Trying to make sure that `f` is not inlined since that would break context stuff.

## Input

`````js filename=intro
function g() {
  let a = { a: 999, b: 1000 };
  function f(p = (a = this)) {}
  $(f());
  $(a);
}
if ($) $(g());
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  let f = function ($$0) {
    const tmpPrevalAliasThis = this;
    const tmpParamBare = $$0;
    debugger;
    let p = tmpParamBare === undefined ? (a = tmpPrevalAliasThis) : tmpParamBare;
  };
  let a = { a: 999, b: 1000 };
  $(f());
  $(a);
};
if ($) $(g());
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  let f = function ($$0) {
    const tmpPrevalAliasThis = this;
    const tmpParamBare = $$0;
    debugger;
    let p = undefined;
    const tmpIfTest = tmpParamBare === undefined;
    if (tmpIfTest) {
      a = tmpPrevalAliasThis;
      p = tmpPrevalAliasThis;
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
  return undefined;
};
if ($) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = g();
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  $(undefined);
  $(undefined);
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( undefined );
  $( undefined );
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
