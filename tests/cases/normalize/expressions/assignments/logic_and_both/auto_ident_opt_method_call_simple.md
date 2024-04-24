# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$((a = b?.c(1)) && (a = b?.c(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
$((a = b?.c(1)) && (a = b?.c(1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$1 = tmpChainRootProp$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.c;
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, 1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
let tmpSSA_a = tmpChainElementCall;
let tmpSSA_tmpCalleeParam = tmpChainElementCall;
if (tmpChainElementCall) {
  const tmpChainElementObject$1 = b.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, b, 1);
  tmpSSA_a = tmpChainElementCall$1;
  tmpSSA_tmpCalleeParam = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
} else {
  $(tmpSSA_tmpCalleeParam);
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, 1 );
let c = b;
let d = b;
if (b) {
  const e = a.c;
  const f = $dotCall( e, a, 1 );
  c = f;
  d = f;
  $( f );
}
else {
  $( d );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
