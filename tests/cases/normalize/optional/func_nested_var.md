# Preval test case

# func_nested_var.md

> Normalize > Optional > Func nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2))?.toString,
        c = (1, b)?.length
  return $(c);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const a = 10,
    b = (a, $(2))?.toString,
    c = (1, b)?.length;
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
  const tmpChainRootProp = $(2);
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.toString;
    b = tmpChainElementObject;
  } else {
  }
  let c = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$1 = tmpChainRootProp$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.length;
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
let b = undefined;
const tmpChainRootProp = $(2);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpChainRootProp$1 = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainRootProp.toString;
  b = tmpChainElementObject;
  tmpChainRootProp$1 = tmpChainElementObject;
}
const tmpIfTest$1 /*:boolean*/ = b == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpReturnArg = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpChainElementObject$1 = tmpChainRootProp$1.length;
  const tmpClusterSSA_tmpReturnArg$1 = $(tmpChainElementObject$1);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 2 );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = b.toString;
  a = e;
  d = e;
}
const f = a == null;
if (f) {
  const g = $( undefined );
  $( g );
}
else {
  const h = d.length;
  const i = $( h );
  $( i );
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
