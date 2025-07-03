# Preval test case

# nan_plus_spy.md

> Normalize > Binary > With > Arr > Nan plus spy
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  [] + x,
];
$(arr);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpArrElement /*:string*/ = $coerce(x, `plustr`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $spy() + ``;
$([tmpArrElement]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "plustr" );
const c = [ b ];
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy();
const tmpBinLhs = [];
const tmpArrElement = tmpBinLhs + x;
const arr = [tmpArrElement];
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: ['12345']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
