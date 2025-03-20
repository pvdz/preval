# Preval test case

# implicit_return_inv_false.md

> If test folding > Implicit return inv false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  let y = undefined;
  if (x) {
    return true;
  } else {
    return false;
  }
}
f();
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:boolean*/ = Boolean(x);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean(x));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Boolean( x );
$( a );
`````


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
