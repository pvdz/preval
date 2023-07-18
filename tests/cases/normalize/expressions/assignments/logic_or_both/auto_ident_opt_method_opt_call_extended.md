# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) || (a = b?.c.d.e?.(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) || (a = b?.c.d.e?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  } else {
  }
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpIfTest$5 = tmpChainElementObject$9 != null;
    if (tmpIfTest$5) {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, 1);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpObjLitVal$1 = { e: $ };
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  a = tmpChainElementCall;
  if (tmpChainElementCall) {
    $(tmpChainElementCall);
  } else {
    let tmpNestedComplexRhs = undefined;
    const tmpChainElementObject$9 = tmpObjLitVal$1.e;
    const tmpIfTest$5 = tmpChainElementObject$9 == null;
    if (tmpIfTest$5) {
    } else {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, 1);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    }
    a = tmpNestedComplexRhs;
    $(tmpNestedComplexRhs);
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {
  $( undefined );
}
else {
  const c = { e: $ };
  const d = $dotCall( $, c, 1 );
  a = d;
  if (d) {
    $( d );
  }
  else {
    let e = undefined;
    const f = c.e;
    const g = f == null;
    if (g) {

    }
    else {
      const h = $dotCall( f, c, 1 );
      e = h;
    }
    a = e;
    $( e );
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
