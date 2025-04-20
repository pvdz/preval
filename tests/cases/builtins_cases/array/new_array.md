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


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_constructor
- (todo) regular property access of an ident feels tricky;
- (todo) Support this ident in isFree CallExpression: $array_constructor


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
