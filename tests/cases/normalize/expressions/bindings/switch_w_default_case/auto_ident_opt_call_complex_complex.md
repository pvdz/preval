# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt call complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($)?.($(1));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$3 = tmpChainElementCall != null;
  if (tmpIfTest$3) {
    const tmpCallObj = tmpChainElementCall;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam = tmpChainRootCall;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
    a = tmpChainElementCall$1;
  }
  $(a);
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$4) {
  $('fail1');
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$5) {
  $('fail2');
}
`````

## Output

`````js filename=intro
let SSA_a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest$3 = tmpChainElementCall != null;
if (tmpIfTest$3) {
  const tmpCallVal = tmpChainElementCall.call;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$1);
  SSA_a = tmpChainElementCall$1;
}
$(SSA_a);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
