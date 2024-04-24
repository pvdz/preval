# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)?.x) || (a = $(b)?.x));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $(b)?.x) || (a = $(b)?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = tmpChainRootCall$1(b);
  const tmpIfTest$1 = tmpChainElementCall$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementCall$1.x;
    tmpNestedComplexRhs = tmpChainElementObject$1;
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
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
let tmpCalleeParam = undefined;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpCalleeParam = tmpChainElementObject;
  if (a) {
    $(tmpCalleeParam);
  } else {
    let tmpNestedComplexRhs = undefined;
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$1 = tmpChainElementCall$1 == null;
    if (tmpIfTest$1) {
    } else {
      const tmpChainElementObject$1 = tmpChainElementCall$1.x;
      tmpNestedComplexRhs = tmpChainElementObject$1;
    }
    a = tmpNestedComplexRhs;
    tmpCalleeParam = tmpNestedComplexRhs;
    $(tmpCalleeParam);
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {
  $( undefined );
}
else {
  const f = c.x;
  a = f;
  e = f;
  if (a) {
    $( e );
  }
  else {
    let g = undefined;
    const h = $( b );
    const i = h == null;
    if (i) {

    }
    else {
      const j = h.x;
      g = j;
    }
    a = g;
    e = g;
    $( e );
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
