# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = $(b)?.x;
    $(a);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
let tmpChainRootCall;
let tmpChainElementCall;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { x: 1 };
  a = undefined;
  tmpChainRootCall = $;
  tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$2 = tmpChainElementCall != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
  }
  $(a);
}
`````

## Output

`````js filename=intro
let a;
const b = { x: 1 };
let SSA_a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest$2 = tmpChainElementCall != null;
if (tmpIfTest$2) {
  const tmpChainElementObject = tmpChainElementCall.x;
  SSA_a = tmpChainElementObject;
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
