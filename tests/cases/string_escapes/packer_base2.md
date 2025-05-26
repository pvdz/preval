# Preval test case

# packer_base2.md

> String escapes > Packer base2

From https://richosoft2.co.uk/resources/jspack/
This is `console.log('boo')` after Dean's PACKER minifier.

## Input

`````js filename=intro
const tmpCalleeParam$5 /*:object*/ = {};
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const e$1 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = tmpCalleeParam$5[e$1];
  return tmpReturnArg;
};
tmpCalleeParam$5[2] = `boo`;
tmpCalleeParam$5[1] = `log`;
tmpCalleeParam$5[0] = `console`;
const tmpMCP$1 /*:regex*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
const p /*:string*/ = $dotCall($string_replace, `0.1('2')`, `replace`, tmpMCP$1, tmpArrElement);
eval(p);
`````


## Settled


`````js filename=intro
eval(`console.log('boo')`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
eval(`console.log('boo')`);
`````


## PST Settled
With rename=true

`````js filename=intro
eval( "console.log('boo')" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCalleeParam$5 = {};
const tmpArrElement = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const e$1 = $dlr_$$0;
  const tmpReturnArg = tmpCalleeParam$5[e$1];
  return tmpReturnArg;
};
tmpCalleeParam$5[2] = `boo`;
tmpCalleeParam$5[1] = `log`;
tmpCalleeParam$5[0] = `console`;
const tmpMCP$1 = new $regex_constructor(`\\b\\w+\\b`, `g`);
const p = $dotCall($string_replace, `0.1('2')`, `replace`, tmpMCP$1, tmpArrElement);
eval(p);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
