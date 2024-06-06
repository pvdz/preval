# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.c(1));
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = b?.c(1));
};
let b = { c: $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
    a = tmpChainElementCall;
    return a;
  } else {
    return a;
  }
};
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
$(tmpChainElementCall);
$(tmpChainElementCall);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, 1 );
$( b );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
