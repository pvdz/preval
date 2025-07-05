# Preval test case

# sequence_call_computed.md

> Normalize > Member access > Statement > Func > Sequence call computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  let c = "foo";
  ($(1), $(2))[$('toString')];
  $(c);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
const tmpCalleeParam /*:unknown*/ = $(`toString`);
tmpCompObj[tmpCalleeParam];
$(`foo`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCompObj = $(2);
const tmpCalleeParam = $(`toString`);
tmpCompObj[tmpCalleeParam];
$(`foo`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = $( "toString" );
a[ b ];
$( "foo" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let c = `foo`;
  $(1);
  const tmpCompObj = $(2);
  const tmpCalleeParam = $(`toString`);
  tmpCompObj[tmpCalleeParam];
  $(c);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'toString'
 - 4: 'foo'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
