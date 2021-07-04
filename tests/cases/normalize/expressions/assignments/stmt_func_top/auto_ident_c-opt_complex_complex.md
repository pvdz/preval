# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  a = $(b)?.[$("x")];
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = $(b)?.[$(`x`)];
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    a = tmpChainElementObject;
  } else {
  }
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  $(tmpChainElementObject);
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
