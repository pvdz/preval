# Preval test case

# no_closure_no_escape.md

> Function self assign closure alias > No closure no escape

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
let f = function(a, b) {
  f = function(c, d) {
    const index = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
`````


## Settled


`````js filename=intro
$(2);
$(3);
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(3);
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 3 );
$( 4 );
`````


## Todos triggered


- (todo) inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
