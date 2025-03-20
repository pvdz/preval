# Preval test case

# array_closure_access.md

> Self assign closure > Array closure access
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the outer function replaces itself with a closure for an array it creates.
> But as long as the array is not mutated nor reference checked, the values should be safe to access.
> 
> So in this case, the function that creates a closure and then calls it to return that reference, is
> the same as making that array a global and outright returning that. Aside from reference checks to `a`
> 
> As a result, the first call to `a()` can be replaced with the `(a = function(){ return arr }, arr)` code
> and any future cases can replace calls to `a()` with `arr` straight.
> If we can't reliably detect the first call then all calls would be replaced by that self assignment.
> It won't solve all cases, like passing the function around into a black hole. But it solves many cases.

## Input

`````js filename=intro
var a = function() {
  const arr = [1, 2, 3];
  a = function(){
    return arr;
  };
  return a();
}
$(a());
$(a()[1]);
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
