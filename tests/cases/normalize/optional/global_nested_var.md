# Preval test case

# global_nested_var.md

> Normalize > Optional > Global nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
const a = 10,
      b = (a, $(2))?.toString,
      c = (1, b)?.length
$(c);
`````

## Pre Normal


`````js filename=intro
const a = 10,
  b = (a, $(2))?.toString,
  c = (1, b)?.length;
$(c);
`````

## Normalized


`````js filename=intro
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
$(c);
`````

## Output


`````js filename=intro
let b = undefined;
const tmpChainRootProp = $(2);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpIfTest$1 /*:boolean*/ = true;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainRootProp.toString;
  b = tmpChainElementObject;
  tmpIfTest$1 = tmpChainElementObject == null;
}
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$1 = b.length;
  $(tmpChainElementObject$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 2 );
const c = b == null;
let d = true;
if (c) {

}
else {
  const e = b.toString;
  a = e;
  d = e == null;
}
if (d) {
  $( undefined );
}
else {
  const f = a.length;
  $( f );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
