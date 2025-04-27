# Preval test case

# closure_bug.md

> Tofix > closure bug

existing case

point here is that we should be able to assert tdz error here because the
`let` is explicit even though its global and as such we can assert that
it'll still tdz since it's in the same scope.
at least i dont think that it could ever be legit that an explicit variable
is referenced before its decl in the same func scope. global/local scope doesnt 
matter for that

## Input

`````js filename=intro
let x = $;
if ($) {

} else {
  x = {};
}
x = $(1);
$(x.headers);
const f = function() {
  $(x);
};
$(f);
`````


## Settled


`````js filename=intro
const tmpSSA_x /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = tmpSSA_x.headers;
$(tmpCalleeParam);
const f /*:()=>undefined*/ = function () {
  debugger;
  $(tmpSSA_x);
  return undefined;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_x = $(1);
$(tmpSSA_x.headers);
$(function () {
  $(tmpSSA_x);
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a.headers;
$( b );
const c = function() {
  debugger;
  $( a );
  return undefined;
};
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
