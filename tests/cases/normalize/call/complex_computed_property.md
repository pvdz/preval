# Preval test case

# complex_computed_property.md

> Normalize > Call > Complex computed property
>
> Calls should have simple objects

## Input

`````js filename=intro
function b() { return $('b'); }
const a = {b: $};
$(a)[b()](1);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { b: $ };
const tmpMCCO /*:unknown*/ = $(a);
const tmpClusterSSA_tmpMCCP /*:unknown*/ = $(`b`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpClusterSSA_tmpMCCP];
$dotCall(tmpMCF, tmpMCCO, undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCO = $({ b: $ });
const tmpClusterSSA_tmpMCCP = $(`b`);
tmpMCCO[tmpClusterSSA_tmpMCCP](1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = $( "b" );
const d = b[ c ];
$dotCall( d, b, undefined, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = function () {
  debugger;
  const tmpReturnArg = $(`b`);
  return tmpReturnArg;
};
const a = { b: $ };
const tmpMCCO = $(a);
const tmpMCCP = b();
const tmpMCF = tmpMCCO[tmpMCCP];
$dotCall(tmpMCF, tmpMCCO, undefined, 1);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 'b'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
