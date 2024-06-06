# Preval test case

# member_call.md

> Normalize > Optional > Member call
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
function f(){ return 10; }
$(f?.());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
$(f?.());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
