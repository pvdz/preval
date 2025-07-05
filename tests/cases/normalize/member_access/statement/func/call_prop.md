# Preval test case

# call_prop.md

> Normalize > Member access > Statement > Func > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  $('foo').length;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(`foo`);
tmpCompObj.length;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`).length;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
a.length;
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpCompObj = $(`foo`);
  tmpCompObj.length;
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
