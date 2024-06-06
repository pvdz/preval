# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && $($)?.($(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && $($)?.($(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  } else {
  }
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpChainElementCall = $($);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(1);
    $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( $ );
  const c = b == null;
  if (c) {

  }
  else {
    const d = $( 1 );
    $dotCall( b, $, d );
  }
}
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
