# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (let xyz = (a = $(b)?.[$("x")]?.[$("y")]); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = $(b)?.[$(`x`)]?.[$(`y`)]);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  } else {
  }
} else {
}
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  }
}
const xyz = a;
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
const a = { y: 1 };
const b = { x: a };
let c = undefined;
const d = $( b );
const e = d == null;
if (e) {

}
else {
  const f = $( "x" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( "y" );
    const j = g[ i ];
    c = j;
  }
}
const k = c;
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
$( k );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( k );
  $( 1 );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
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
