# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident opt call complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = $($)?.(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a = $($)?.(1);
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
    a = tmpChainElementCall$1;
  } else {
  }
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  $(tmpChainElementCall$1);
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = $dotCall( a, $, undefined, 1 );
  $( c );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
