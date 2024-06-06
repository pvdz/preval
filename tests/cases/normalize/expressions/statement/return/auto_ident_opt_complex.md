# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Return > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return $(b)?.x;
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(b)?.x;
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
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.x;
    tmpReturnArg = tmpChainElementObject;
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
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
const f = function () {
  debugger;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall == null;
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpChainElementObject = tmpChainElementCall.x;
    return tmpChainElementObject;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = function() {
  debugger;
  const c = $( a );
  const d = c == null;
  if (d) {
    return undefined;
  }
  else {
    const e = c.x;
    return e;
  }
};
const f = b();
$( f );
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
 - 1: { x: '1' }
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
