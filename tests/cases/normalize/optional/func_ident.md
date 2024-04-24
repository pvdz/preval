# Preval test case

# func_ident.md

> Normalize > Optional > Func ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $(global?.foo);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(global?.foo);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = global;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
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
let tmpReturnArg = undefined;
const tmpIfTest = global == null;
if (tmpIfTest) {
  tmpReturnArg = $(undefined);
  $(tmpReturnArg);
} else {
  const tmpChainElementObject = global.foo;
  tmpReturnArg = $(tmpChainElementObject);
  $(tmpReturnArg);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = global == null;
if (b) {
  a = $( undefined );
  $( a );
}
else {
  const c = global.foo;
  a = $( c );
  $( a );
}
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
