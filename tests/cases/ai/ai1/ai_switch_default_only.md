# Preval test case

# ai_switch_default_only.md

> Ai > Ai1 > Ai switch default only
>
> Test: Switch statement with only a default case.

## Input

`````js filename=intro
// Expected: $('input'); const $$def = $('def'); $('use', $$def);
let v = $('input');
let out;
switch (v) {
  default:
    out = $('def');
}
$('use', out);
`````


## Settled


`````js filename=intro
$(`input`);
const out /*:unknown*/ = $(`def`);
$(`use`, out);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`input`);
$(`use`, $(`def`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "input" );
const a = $( "def" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let v = $(`input`);
let out = undefined;
const tmpSwitchDisc = v;
out = $(`def`);
$(`use`, out);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input'
 - 2: 'def'
 - 3: 'use', 'def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
