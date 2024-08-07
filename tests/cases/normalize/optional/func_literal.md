# Preval test case

# func_literal.md

> Normalize > Optional > Func literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'?.length);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(`foo`?.length);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = `foo`;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.length;
    tmpCalleeParam = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(3);
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
