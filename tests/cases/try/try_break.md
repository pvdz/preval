# Preval test case

# try_break.md

> Try > Try break
>
>

## Input

`````js filename=intro
A: {
  try {
    break A;
  } catch {
    $('unreachable');
  }
  $('also unreachable');
}
$('end');
`````

## Settled


`````js filename=intro
$(`end`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`end`);
`````

## Pre Normal


`````js filename=intro
A: {
  try {
    break A;
  } catch (e) {
    $(`unreachable`);
  }
  $(`also unreachable`);
}
$(`end`);
`````

## Normalized


`````js filename=intro
$(`end`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "end" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
