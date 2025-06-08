# Preval test case

# ident_method.md

> Normalize > Object > Dupe props > Ident method
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {a: $('prop'), a(){}};
$(x);
`````


## Settled


`````js filename=intro
$(`prop`);
const x /*:object*/ /*truthy*/ = {
  a() {
    debugger;
    return undefined;
  },
};
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`prop`);
$({ a() {} });
`````


## PST Settled
With rename=true

`````js filename=intro
$( "prop" );
const a = { a(  ) {
  debugger;
  return undefined;
} };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`prop`);
const x = {
  a() {
    debugger;
    return undefined;
  },
};
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prop'
 - 2: { a: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
