# Preval test case

# dotcall_alias_not_same_obj.md

> Object literal > Inlining > Dotcall alias not same obj
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {}};
a?.b.c?.(1);
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
a?.b.c?.(1);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 1);
  } else {
  }
} else {
}
`````

## Output


`````js filename=intro
const tmpChainElementObject$1 = $Object_prototype.c;
const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal /*:object*/ = {};
  $dotCall(tmpChainElementObject$1, tmpObjLitVal, 1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.c;
const b = a == null;
if (b) {

}
else {
  const c = {};
  $dotCall( a, c, 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
