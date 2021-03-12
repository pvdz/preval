# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)?.[$("x")])) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      tmpNestedComplexRhs = tmpChainElementObject;
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
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
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainElementCall = $(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      tmpNestedComplexRhs = tmpChainElementObject;
    }
    a = tmpNestedComplexRhs;
  }
};
const b = { x: 1 };
let a = { a: 999, b: 1000 };
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
 - 3: undefined
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
