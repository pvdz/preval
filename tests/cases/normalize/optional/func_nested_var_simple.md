# Preval test case

# func_nested_var_simple.md

> Normalize > Optional > Func nested var simple
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2)?.toString,
        c = b?.length
  return $(c);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const a = 10,
    b = $(2)?.toString,
    c = b?.length;
  return $(c);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const a = 10;
  let b = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(2);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.toString;
    b = tmpChainElementObject;
  } else {
  }
  let c = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp.length;
    c = tmpChainElementObject$1;
  } else {
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementCall = $(2);
const tmpIfTest = tmpChainElementCall == null;
let tmpChainRootProp = undefined;
let tmpIfTest$1 = true;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.toString;
  tmpChainRootProp = tmpChainElementObject;
  tmpIfTest$1 = tmpChainElementObject == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpReturnArg = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpChainElementObject$1 = tmpChainRootProp.length;
  const tmpClusterSSA_tmpReturnArg$1 = $(tmpChainElementObject$1);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = a == null;
let c = undefined;
let d = true;
if (b) {

}
else {
  const e = a.toString;
  c = e;
  d = e == null;
}
if (d) {
  const f = $( undefined );
  $( f );
}
else {
  const g = c.length;
  const h = $( g );
  $( h );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
