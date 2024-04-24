# Preval test case

# func_assign_member2.md

> Normalize > Optional > Func assign member2
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $({foo: 10}))?.foo;
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = (1, 2, $({ foo: 10 }))?.foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = undefined;
  const tmpCallCallee = $;
  const tmpCalleeParam = { foo: 10 };
  const tmpChainRootProp = tmpCallCallee(tmpCalleeParam);
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    y = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { foo: 10 };
const tmpChainRootProp = $(tmpCalleeParam);
const tmpIfTest = tmpChainRootProp == null;
let tmpReturnArg = undefined;
if (tmpIfTest) {
  tmpReturnArg = $(undefined);
  $(tmpReturnArg);
} else {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpReturnArg = $(tmpChainElementObject);
  $(tmpReturnArg);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { foo: 10 };
const b = $( a );
const c = b == null;
let d = undefined;
if (c) {
  d = $( undefined );
  $( d );
}
else {
  const e = b.foo;
  d = $( e );
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { foo: '10' }
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
