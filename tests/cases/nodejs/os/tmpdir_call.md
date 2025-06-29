# Preval test case

# tmpdir_call.md

> Nodejs > Os > Tmpdir call
>
> nodejs required stuff

## Options

- skipEval

## Input

`````js filename=intro
const os = require('os');
$(os.tmpdir());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:string*/ = $require_os_tmpdir();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($require_os_tmpdir());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $require_os_tmpdir();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const os = require(`os`);
const tmpMCF = os.tmpdir;
let tmpCalleeParam = $dotCall(tmpMCF, os, `tmpdir`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $require_os_tmpdir


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
