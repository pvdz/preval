# Preval test case

# return_var_arguments.md

> Function inlining > Return var arguments
>
> A function that is a variable decl with simple init and a return of this value should be inlined

The constant should be eliminated anyways but that's a different matter.

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
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  debugger;
  let g = function () {
    debugger;
    const y = x;
    return y;
  };
  const x = tmpPrevalAliasArgumentsAny;
  return g();
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  debugger;
  let g = function () {
    debugger;
    return x;
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
const f /*:(unknown)=>*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  return tmpPrevalAliasArgumentsAny;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  return b;
};
const d = a();
$( d );
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
