# Preval test case

# back2back_x_x_plus_1_assign4_bad.md

The `x = 1; x = 2;` pattern should still SSA even for closured.
vars that can't rely on ref tracking.
Such reads/writes can't possibly reach a binding outside of their current scope...?

Counter case. I think it's an invalid report.

## Input

`````js filename=intro
{
  let x = $();
  $(x);
  x = $({
    toString(){
      // When assigning x=x+1 on the next statement the value of x
      // should be this spy. If we SSA it, that wouldn't be the case
      $(x)
    }
  });
  x = x + 1;
  
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $();
$(x);
const tmpCalleeParam /*:object*/ /*truthy*/ = {
  toString() {
    debugger;
    $(x);
    return undefined;
  },
};
x = $(tmpCalleeParam);
x = x + 1;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $();
$(x);
x = $({
  toString() {
    $(x);
  },
});
x = x + 1;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $();
$( a );
const b = { toString(  ) {
  debugger;
  $( a );
  return undefined;
} };
a = $( b );
a = a + 1;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $();
$(x);
let tmpCalleeParam = {
  toString() {
    debugger;
    $(x);
    return undefined;
  },
};
x = $(tmpCalleeParam);
x = x + 1;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: { toString: '"<function>"' }
 - 4: { toString: '"<function>"' }
 - 5: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
