# Preval test case

# func_group_call.md

> Normalize > Optional > Func group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())?.()
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const y = (1, 2, $())?.();
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  const tmpChainRootCall = $();
  const tmpIfTest = tmpChainRootCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall = tmpChainRootCall();
    y = tmpChainElementCall;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpChainRootCall = $();
const tmpIfTest = tmpChainRootCall == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpChainElementCall = tmpChainRootCall();
  const tmpClusterSSA_tmpReturnArg$1 = $(tmpChainElementCall);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  const c = $( undefined );
  $( c );
}
else {
  const d = a();
  const e = $( d );
  $( e );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
