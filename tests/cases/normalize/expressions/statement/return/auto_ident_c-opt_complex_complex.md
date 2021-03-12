# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return $(b)?.[$("x")];
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $(b)?.[$('x')];
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
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
const f = function () {
  let tmpReturnArg = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    tmpReturnArg = tmpChainElementObject;
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
  }
};
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
