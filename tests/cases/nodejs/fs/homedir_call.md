# Preval test case

# homedir_call.md

> Nodejs > Fs > Homedir call
>
> nodejs required stuff

## Options

- skipEval

## Input

`````js filename=intro
const fs = require('fs');
$(fs.existsSync('/ab/cd'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:boolean*/ = $require_fs_existsSync(`/ab/cd`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($require_fs_existsSync(`/ab/cd`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $require_fs_existsSync( "/ab/cd" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const fs = require(`fs`);
const tmpMCF = fs.existsSync;
let tmpCalleeParam = $dotCall(tmpMCF, fs, `existsSync`, `/ab/cd`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $require_fs_existsSync


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
