# Preval test case

# hostname_call.md

> Nodejs > Os > Hostname call
>
> nodejs required stuff

## Options

- skipEval

## Input

`````js filename=intro
const os = require('os');
$(os.hostname());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:string*/ = $require_os_hostname();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($require_os_hostname());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $require_os_hostname();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const os = require(`os`);
const tmpMCF = os.hostname;
let tmpCalleeParam = $dotCall(tmpMCF, os, `hostname`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $require_os_hostname


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
