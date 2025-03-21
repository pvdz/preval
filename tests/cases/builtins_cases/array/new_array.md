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


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````


## Todos triggered


None


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
