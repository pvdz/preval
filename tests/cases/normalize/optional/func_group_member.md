# Preval test case

# func_group_member.md

> Normalize > Optional > Func group member
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())?.foo
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const y = (1, 2, $())?.foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    y = tmpChainElementObject;
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
const tmpChainRootProp = $();
const tmpIfTest = tmpChainRootProp == null;
let tmpReturnArg = undefined;
if (tmpIfTest) {
  tmpReturnArg = $(undefined);
  $(tmpReturnArg);
} else {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpReturnArg = $(tmpChainElementObject);
  $(tmpReturnArg);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = a == null;
let c = undefined;
if (b) {
  c = $( undefined );
  $( c );
}
else {
  const d = a.foo;
  c = $( d );
  $( c );
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
