# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = $(b)?.[$("x")];
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = $(b)?.[$('x')];
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    a = tmpChainElementObject;
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
  const b = { x: 1 };
  let a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    a = tmpChainElementObject;
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
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
