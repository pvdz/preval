# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: 1 } };

    let a = $(b)?.[$("x")]?.[$("y")];
    $(a);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpObjLitVal = { y: 1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$2 = tmpChainElementCall != null;
  if (tmpIfTest$2) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$1 = $('y');
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      a = tmpChainElementObject$1;
    }
  }
  $(a);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let SSA_a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest$2 = tmpChainElementCall != null;
if (tmpIfTest$2) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    SSA_a = tmpChainElementObject$1;
  }
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
