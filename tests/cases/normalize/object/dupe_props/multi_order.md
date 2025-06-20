# Preval test case

# multi_order.md

> Normalize > Object > Dupe props > Multi order
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {a: $('1'), a: $('2'), a: $('3'), a(){}};
$(x);
`````


## Settled


`````js filename=intro
$(`1`);
$(`2`);
$(`3`);
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
$(`1`);
$(`2`);
$(`3`);
$({ a() {} });
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1" );
$( "2" );
$( "3" );
const a = { a(  ) {
  debugger;
  return undefined;
} };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`1`);
$(`2`);
$(`3`);
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
 - 1: '1'
 - 2: '2'
 - 3: '3'
 - 4: { a: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
