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
