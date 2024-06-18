# Preval test case

# react_crash.md

> Tofix > React crash
>
> 

## Input

`````js filename=intro
function error(format) {
  var len = arguments.length;
  var args = new Array(len > 1 ? len - 1 : 0);
  var key = 1;
  for (; key < len; key++) {
    args[key - 1] = arguments[key];
  }
}

error();
`````

## Pre Normal


`````js filename=intro
let error = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let format = $$0;
  debugger;
  let args = undefined;
  let key = undefined;
  let len = undefined;
  len = tmpPrevalAliasArgumentsLen;
  args = new Array(len > 1 ? len - 1 : 0);
  key = 1;
  {
    while (key < len) {
      {
        args[key - 1] = tmpPrevalAliasArgumentsAny[key];
      }
      key++;
    }
  }
};
error();
`````

## Normalized


`````js filename=intro
let error = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let format = $$0;
  debugger;
  let args = undefined;
  let key = undefined;
  let len = undefined;
  len = tmpPrevalAliasArgumentsLen;
  const tmpNewCallee = Array;
  let tmpCalleeParam = undefined;
  const tmpIfTest = len > 1;
  if (tmpIfTest) {
    tmpCalleeParam = len - 1;
  } else {
    tmpCalleeParam = 0;
  }
  args = new tmpNewCallee(tmpCalleeParam);
  key = 1;
  let tmpIfTest$1 = key < len;
  while (true) {
    if (tmpIfTest$1) {
      const tmpAssignComMemLhsObj = args;
      const tmpAssignComMemLhsProp = key - 1;
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      const tmpAssignComputedRhs = tmpPrevalAliasArgumentsAny[key];
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      const tmpPostUpdArgIdent = key;
      key = key + 1;
      tmpIfTest$1 = key < len;
    } else {
      break;
    }
  }
  return undefined;
};
error();
`````

## Output


`````js filename=intro
new Array(0);
`````

## PST Output

With rename=true

`````js filename=intro
new Array( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
