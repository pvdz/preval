# Preval test case

# alias_used_in_destructuring.md

> Ternary alias > Ai silly contrived > Alias used in destructuring
>
> b is used in destructuring: should NOT replace

## Input

`````js filename=intro
let x = true;
let obj = {};
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
let { [b]: val } = obj;
$(a, b);
// Expect: No change, destructuring context is not safe
`````


## Settled


`````js filename=intro
$(undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
let obj = {};
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
let tmpBindingPatternObjRoot = obj;
let tmpCK = b;
let val = tmpBindingPatternObjRoot[tmpCK];
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
