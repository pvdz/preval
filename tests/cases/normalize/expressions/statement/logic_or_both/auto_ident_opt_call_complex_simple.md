# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.(1) || $($)?.(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.(1) || $($)?.(1);
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
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
  tmpIfTest = tmpChainElementCall$1;
} else {
}
if (tmpIfTest) {
} else {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = tmpChainRootCall$1($);
  const tmpIfTest$3 = tmpChainElementCall$3 != null;
  if (tmpIfTest$3) {
    const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, tmpChainRootCall$1, 1);
  } else {
  }
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
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
} else {
  const tmpChainElementCall$3 = $($);
  const tmpIfTest$3 = tmpChainElementCall$3 == null;
  if (tmpIfTest$3) {
  } else {
    $dotCall(tmpChainElementCall$3, $, 1);
  }
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
  const d = $dotCall( b, $, 1 );
  a = d;
}
if (a) {

}
else {
  const e = $( $ );
  const f = e == null;
  if (f) {

  }
  else {
    $dotCall( e, $, 1 );
  }
}
const g = {
a: 999,
b: 1000
;
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
