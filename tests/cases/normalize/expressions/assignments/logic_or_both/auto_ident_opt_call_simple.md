# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) || (a = $?.(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) || (a = $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpIfTest$1 = tmpChainRootCall$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
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
let a = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  if (tmpChainElementCall) {
    $(tmpChainElementCall);
  } else {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $ == null;
    if (tmpIfTest$1) {
    } else {
      const tmpChainElementCall$1 = $(1);
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
  const c = $( 1 );
  a = c;
  if (c) {
    $( c );
  }
  else {
    let d = undefined;
    const e = $ == null;
    if (e) {

    }
    else {
      const f = $( 1 );
      d = f;
    }
    a = d;
    $( d );
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
