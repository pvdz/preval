# Preval test case

# dupe_string.md

> Free > Dupe string
>
> Somehow strings are getting duplicated

At the time of writing, the second string would get DUPE twice

## Input

`````js filename=intro
const data = [`a`, `DUPE`, `c`];
const get = function(i) {
  return data[i];
};
const p = get(0);
$(p);
const q = get(1);
const r = get(2);
$(q + r);
`````


## Settled


`````js filename=intro
$(`a`);
$(`DUPEc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$(`DUPEc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
$( "DUPEc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const data = [`a`, `DUPE`, `c`];
const get = function ($$0) {
  let i = $$0;
  debugger;
  const tmpReturnArg = data[i];
  return tmpReturnArg;
};
const p = get(0);
$(p);
const q = get(1);
const r = get(2);
let tmpCalleeParam = q + r;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'DUPEc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
