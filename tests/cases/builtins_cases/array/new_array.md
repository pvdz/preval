# Preval test case

# new_array.md

> Builtins cases > Array > New array
>
> At some point this snippet crashed.
> Now it's just a case of Array being left behind.

## Input

`````js filename=intro
function error(format) {
  var len = arguments.length;
  var args = new Array(len > 1 ? len - 1 : 0);
  var key = 1;
  for (; key < len; key++) {
    args[key - 1] = arguments[key];
  }
  return args;
}

$(error());
`````

## Settled


`````js filename=intro
const tmpClusterSSA_args /*:array*/ = [];
$(tmpClusterSSA_args);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
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
  return args;
};
$(error());
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
  while (true) {
    const tmpIfTest$1 = key < len;
    if (tmpIfTest$1) {
      const tmpAssignComMemLhsObj = args;
      const tmpAssignComMemLhsProp = key - 1;
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      const tmpAssignComputedRhs = tmpPrevalAliasArgumentsAny[key];
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      const tmpPostUpdArgIdent = key;
      key = key + 1;
    } else {
      break;
    }
  }
  return args;
};
const tmpCalleeParam$1 = error();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
