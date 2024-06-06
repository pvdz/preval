# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident opt call complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = $($)?.(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $($)?.(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
  a = tmpChainElementCall$1;
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
  $(tmpChainElementCall$1);
}
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
  const c = $dotCall( a, $, 1 );
  $( c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
