# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > For let > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for (let xyz = b?.c(1); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
{
  let xyz = b?.c(1);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  xyz = tmpChainElementCall;
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
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $dotCall($, b, 1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
$(tmpChainElementCall);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpChainElementCall);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = {
a: 999,
b: 1000
;
const c = $dotCall( $, a, 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
$( b );
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
