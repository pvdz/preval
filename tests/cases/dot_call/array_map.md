# Preval test case

# array_map.md

> Dot call > Array map
>
> Undo the "damage" done by dot call when we can detect it not to be necessary. We assert that $dotCall used to be a method call before so if the args are safe to inline, we can undo this step now. It was necessary for safe normalization purposes.

## Input

`````js filename=intro
// Undo the "damage" done by dot call when we can detect it not to be necessary. We assert that $dotCall used to be a method call before so if the args are safe to inline, we can undo this step now. It was necessary for safe normalization purposes.
const pre = [1, 2, 3];
const map = pre.map;
const f = function(item) {
  $('hello', item);
  return item + 1;
};
const arr = $dotCall(map, pre, 'map', f); // Turn this back into `pre.map(f);`
$(arr);
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>primitive*/ = function ($$0) {
  const item /*:unknown*/ = $$0;
  debugger;
  $(`hello`, item);
  const tmpReturnArg /*:primitive*/ = item + 1;
  return tmpReturnArg;
};
const pre /*:array*/ = [1, 2, 3];
const arr /*:array*/ = $dotCall($array_map, pre, `map`, f);
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (item) {
  $(`hello`, item);
  const tmpReturnArg = item + 1;
  return tmpReturnArg;
};
$($dotCall($array_map, [1, 2, 3], `map`, f));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "hello", b );
  const c = b + 1;
  return c;
};
const d = [ 1, 2, 3 ];
const e = $dotCall( $array_map, d, "map", a );
$( e );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_map
- (todo) arr mutation may be able to inline this method: map
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello', 1
 - 2: 'hello', 2
 - 3: 'hello', 3
 - 4: [2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
