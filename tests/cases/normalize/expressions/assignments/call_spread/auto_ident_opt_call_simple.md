# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $?.(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
  $(...undefined);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  $(...tmpChainElementCall);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {
  $( ... undefined );
}
else {
  const c = $( 1 );
  a = c;
  $( ... c );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
