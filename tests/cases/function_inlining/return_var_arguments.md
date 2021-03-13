# Preval test case

# return_var_arguments.md

> Function inlining > Return var arguments
>
> A function that is a variable decl with simple init and a return of this value should be inlined

The constant should be eliminated anyways but that's a different matter.

#TODO

## Input

`````js filename=intro
function f(a) {
  const x = arguments;
  function g() {
    const y = x;
    return y;
  }
  return g();
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function (a) {
  let g = function () {
    const y = x;
    return y;
  };
  const x = arguments;
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function (a) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let g = function () {
    const y = x;
    return y;
  };
  const x = tmpPrevalAliasArgumentsAny;
  const tmpReturnArg = g();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (a) {
  const tmpPrevalAliasArgumentsAny = arguments;
  return tmpPrevalAliasArgumentsAny;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
