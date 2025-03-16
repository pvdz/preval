# Preval test case

# octal.md

> String escapes > Octal
>
> Welcome to the webcompat corner

## Options

Octals dont play well.

- skipEval

## Input

`````js filename=intro
$("\13\17\31\08\12\29\21\22\7\16\08\07\09");
`````

## Settled


`````js filename=intro
$(`\u000b\u000f\u0019\u00008
\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\u000b\u000f\u0019\u00008
\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009`);
`````

## Pre Normal


`````js filename=intro
$(`\u000b\u000f\u0019\u00008
\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009`);
`````

## Normalized


`````js filename=intro
$(`\u000b\u000f\u0019\u00008
\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "\u000b\u000f\u0019\u00008\u000a\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
