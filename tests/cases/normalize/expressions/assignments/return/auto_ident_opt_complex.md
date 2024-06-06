# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b)?.x);
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = $(b)?.x);
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
    return a;
  } else {
    return a;
  }
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { x: 1 };
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall == null;
  if (tmpIfTest) {
    return a;
  } else {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
    return tmpChainElementObject;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
let b = {
a: 999,
b: 1000
;
const c = function() {
  debugger;
  b = undefined;
  const d = $( a );
  const e = d == null;
  if (e) {
    return b;
  }
  else {
    const f = d.x;
    b = f;
    return f;
  }
};
const g = c();
$( g );
$( b );
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
