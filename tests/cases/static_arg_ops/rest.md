# Preval test case

# rest.md

> Static arg ops > Rest
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param and the call uses a spread that covers this param.

We cannot inline this here because at static time we cannot guarantee the contents of the array (edge cases aside).

## Input

`````js filename=intro
let f = function () {
  let g = function (a, ...b) {
    x = typeof b;
  };
  const arr = $([1, 2]);
  g(10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2];
$(tmpCalleeParam);
$(`object`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2]);
$(`object`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
$( a );
$( "object" );
`````


## Todos triggered


- (todo) drop unused rest param?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
