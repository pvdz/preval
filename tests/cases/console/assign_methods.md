# Preval test case

# assign_methods.md

> Console > Assign methods
>
>

## Input

`````js filename=intro
$(
  console.log,
  console.warn,
  console.error,
  console.dir,
  console.debug,
  console.time,
  console.timeEnd,
  console.group,
  console.groupEnd,
  console.foo,
);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$17 /*:unknown*/ = console.foo;
$(
  $console_log,
  $console_warn,
  $console_error,
  $console_dir,
  $console_debug,
  $console_time,
  $console_timeEnd,
  $console_group,
  $console_groupEnd,
  tmpCalleeParam$17,
);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  $console_log,
  $console_warn,
  $console_error,
  $console_dir,
  $console_debug,
  $console_time,
  $console_timeEnd,
  $console_group,
  $console_groupEnd,
  console.foo,
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = console.foo;
$( $console_log, $console_warn, $console_error, $console_dir, $console_debug, $console_time, $console_timeEnd, $console_group, $console_groupEnd, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $console_log;
let tmpCalleeParam$1 = $console_warn;
let tmpCalleeParam$3 = $console_error;
let tmpCalleeParam$5 = $console_dir;
let tmpCalleeParam$7 = $console_debug;
let tmpCalleeParam$9 = $console_time;
let tmpCalleeParam$11 = $console_timeEnd;
let tmpCalleeParam$13 = $console_group;
let tmpCalleeParam$15 = $console_groupEnd;
let tmpCalleeParam$17 = console.foo;
$(
  tmpCalleeParam,
  tmpCalleeParam$1,
  tmpCalleeParam$3,
  tmpCalleeParam$5,
  tmpCalleeParam$7,
  tmpCalleeParam$9,
  tmpCalleeParam$11,
  tmpCalleeParam$13,
  tmpCalleeParam$15,
  tmpCalleeParam$17,
);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
