# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Logic or left > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.($(1)) || $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.($(1)) || $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpCallCallee = $dotCall;
  const tmpCalleeParam = tmpChainElementCall;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  tmpIfTest = tmpChainElementCall$1;
} else {
}
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Output


`````js filename=intro
let tmpIfTest = false;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
} else {
  $(100);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $( 1 );
  const e = $dotCall( b, $, d );
  a = e;
}
if (a) {

}
else {
  $( 100 );
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
