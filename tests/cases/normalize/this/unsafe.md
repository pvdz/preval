# Preval test case

# unsafe.md

> Normalize > This > Unsafe
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

## Input

`````js filename=intro
function f() {
  const x = this;
  function g() {
     return x; // Should not be inlined
  }
  return g();
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    return x;
  };
  const x = tmpPrevalAliasThis;
  return g();
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    return x;
  };
  const x = tmpPrevalAliasThis;
  const tmpReturnArg = g();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
