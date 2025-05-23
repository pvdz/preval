# Preval test case

# sequence_ident_computed.md

> Normalize > Member access > Statement > Func > Sequence ident computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  let b = "foo", c = 1;
  ($(1), b)[$('length')];
  $(c);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $(`length`);
`foo`[tmpCalleeParam];
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCalleeParam = $(`length`);
`foo`[tmpCalleeParam];
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "length" );
"foo"[ a ];
$( 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = `foo`;
  let c = 1;
  $(1);
  const tmpCompObj = b;
  const tmpCalleeParam = $(`length`);
  tmpCompObj[tmpCalleeParam];
  $(c);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
