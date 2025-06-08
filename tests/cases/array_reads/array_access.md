# Preval test case

# array_access.md

> Array reads > Array access
>
> Once the output is fixed, preval should be able to resolve the a[0] to 0
> in this case. I think it doesn't because it "escapes".

## Input

`````js filename=intro
let a = [0];
const b = a;
const c = a[0];
const d = c + 1;
b[0] = d;
$(a);
const e = a[0];
const f = e < 10;
if (f) {
  $(a,b,c,d,e,f)
} else {
}
`````


## Settled


`````js filename=intro
const a /*:array*/ /*truthy*/ = [1];
$(a);
const e /*:primitive*/ = a[0];
const f /*:boolean*/ = e < 10;
if (f) {
  $(a, a, 0, 1, e, true);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1];
$(a);
const e = a[0];
if (e < 10) {
  $(a, a, 0, 1, e, true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
$( a );
const b = a[ 0 ];
const c = b < 10;
if (c) {
  $( a, a, 0, 1, b, true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = [0];
const b = a;
const c = a[0];
const d = c + 1;
b[0] = d;
$(a);
const e = a[0];
const f = e < 10;
if (f) {
  $(a, b, c, d, e, f);
} else {
}
`````


## Todos triggered


- (todo) In some (many?) cases the array can access this value so we could move the rhs into the array...
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - 2: [1], [1], 0, 1, 1, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
