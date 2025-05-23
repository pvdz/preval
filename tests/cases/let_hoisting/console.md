# Preval test case

# console.md

> Let hoisting > Console
>
> console.log can be considered side effect free

## Input

`````js filename=intro
let f = function() {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
console.log('hi');
let x = $(2);
f();
`````


## Settled


`````js filename=intro
$(1);
$dotCall($console_log, console, `log`, `hi`);
const x /*:unknown*/ = $(2);
$(x, `f`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$dotCall($console_log, console, `log`, `hi`);
$($(2), `f`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$dotCall( $console_log, console, "log", "hi" );
const a = $( 2 );
$( a, "f" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
const tmpMCF = $console_log;
$dotCall($console_log, console, `log`, `hi`);
let x = $(2);
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 -  1: 1
 - !2: 'called $console_log:', 'hi'
 - !3: 2
 - !4: 2, 'f'
 - !eval returned: undefined

Post settled calls: BAD!!
 -  1: 1
 - !2: 'called $console_log:', 'hi'
 - !3: 2
 - !4: 2, 'f'
 - !eval returned: undefined

Denormalized calls: BAD!!
 -  1: 1
 - !2: 'called $console_log:', 'hi'
 - !3: 2
 - !4: 2, 'f'
 - !eval returned: undefined
