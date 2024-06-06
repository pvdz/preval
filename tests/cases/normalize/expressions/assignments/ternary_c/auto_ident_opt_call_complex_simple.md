# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($)?.(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($)?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
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
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall = $($);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  let d = undefined;
  const e = $( $ );
  const f = e == null;
  if (f) {

  }
  else {
    const g = $dotCall( e, $, 1 );
    d = g;
  }
  a = d;
  $( d );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
