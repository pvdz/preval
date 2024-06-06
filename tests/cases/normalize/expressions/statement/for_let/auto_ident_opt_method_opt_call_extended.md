# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > For let > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (let xyz = b?.c.d.e?.(1); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
{
  let xyz = b?.c.d.e?.(1);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
    xyz = tmpChainElementCall;
  } else {
  }
} else {
}
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpObjLitVal$1 = { e: $ };
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  xyz = tmpChainElementCall;
  $(tmpChainElementCall);
}
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
let b = undefined;
const c = $ == null;
if (c) {
  $( undefined );
}
else {
  const d = { e: $ };
  const e = $dotCall( $, d, 1 );
  b = e;
  $( e );
}
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
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
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
