# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: $ };

    let a = b?.c(1);
    $(a);
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { c: $ };
    a = b?.c(1);
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = { c: $ };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
    a = tmpChainElementCall;
  } else {
  }
  $(a);
} else {
}
`````

## Output


`````js filename=intro
const tmpClusterSSA_b = { c: $ };
const tmpChainElementCall = $dotCall($, tmpClusterSSA_b, 1);
$(tmpChainElementCall);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
