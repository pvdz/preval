# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: { y: 1 } };

  let a = $(b)?.[$("x")]?.[$("y")];
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { x: { y: 1 } };
  let a = $(b)?.[$('x')]?.[$('y')];
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal = { y: 1 };
  let b = { x: tmpObjLitVal };
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 = tmpChainElementObject != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed$1 = $('y');
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      a = tmpChainElementObject$1;
    }
  }
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal = { y: 1 };
  const b = { x: tmpObjLitVal };
  let a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 = tmpChainElementObject != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed$1 = $('y');
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      a = tmpChainElementObject$1;
    }
  }
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
