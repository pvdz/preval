# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident c-opt complex complex c-opt complex complex
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
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Pre Normal

`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { x: { y: 1 } };
      a = $(b)?.[$('x')]?.[$('y')];
      $(a);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  const tmpObjLitVal = { y: 1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$3 = tmpChainElementCall != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$4 = tmpChainElementObject != null;
    if (tmpIfTest$4) {
      const tmpChainRootComputed$1 = $('y');
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      a = tmpChainElementObject$1;
    }
  }
  $(a);
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $('fail1');
}
const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$6) {
  $('fail2');
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let SSA_a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest$3 = tmpChainElementCall != null;
if (tmpIfTest$3) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$4 = tmpChainElementObject != null;
  if (tmpIfTest$4) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    SSA_a = tmpChainElementObject$1;
  }
}
$(SSA_a);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
