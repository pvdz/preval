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
const tmpCalleeParam$1 /*:array*/ = $array_constructor(0);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($array_constructor(0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $array_constructor( 0 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

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
      const tmpPostUpdArgIdent = $coerce(key, `number`);
      key = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
  return args;
};
let tmpCalleeParam$1 = error();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Support this ident in isFree CallExpression: $array_constructor
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $array_constructor


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
