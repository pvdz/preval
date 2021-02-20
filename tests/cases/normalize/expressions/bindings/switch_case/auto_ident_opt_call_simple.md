# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt call simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $?.(1);
    $(a);
}
`````

## Normalized

`````js filename=intro
let a;
let tmpChainRootCall;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = undefined;
  tmpChainRootCall = $;
  const tmpIfTest$2 = tmpChainRootCall != null;
  if (tmpIfTest$2) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
  }
  $(a);
}
`````

## Output

`````js filename=intro
let SSA_a = undefined;
const tmpIfTest$2 = $ != null;
if (tmpIfTest$2) {
  const tmpChainElementCall = $(1);
  SSA_a = tmpChainElementCall;
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
