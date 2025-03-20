# Preval test case

# pseudo_alias.md

> Normalize > Dowhile > Pseudo alias
>
> From react

This is the findOwnerStack function in react.

The point here is that doWhileFlag is an alias to the test value v but it is redundant as v serves the same purpose.

After that, the constant y should also be up for elimination.

## Input

`````js filename=intro
function f(v) {
  if (v) {
    let doWhileFlag = true;
    while (doWhileFlag) {
      $('loop');
      const x = v._currentElement;
      const y = x._owner;
      v = y;
      doWhileFlag = y;
    }
  }
}
$(f());
$(f());
`````


## Settled


`````js filename=intro
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
