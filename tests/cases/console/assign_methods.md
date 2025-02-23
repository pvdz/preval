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

## Pre Normal


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

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $console_log;
const tmpCalleeParam$1 = $console_warn;
const tmpCalleeParam$3 = $console_error;
const tmpCalleeParam$5 = $console_dir;
const tmpCalleeParam$7 = $console_debug;
const tmpCalleeParam$9 = $console_time;
const tmpCalleeParam$11 = $console_timeEnd;
const tmpCalleeParam$13 = $console_group;
const tmpCalleeParam$15 = $console_groupEnd;
const tmpCalleeParam$17 = console.foo;
tmpCallCallee(
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

## Output


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

## PST Output

With rename=true

`````js filename=intro
const a = console.foo;
$( $console_log, $console_warn, $console_error, $console_dir, $console_debug, $console_time, $console_timeEnd, $console_group, $console_groupEnd, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', '<function>', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
