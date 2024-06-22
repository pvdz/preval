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

## Output


`````js filename=intro
$(`end`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "end" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
