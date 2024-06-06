# Preval test case

# while_if_break_break.md

> Labels > While if break break
>
> 

#TODO

## Input

`````js filename=intro
A: {
  while (true) {
    $();
    break A;
  }
  $('fail');
}
`````

## Pre Normal


`````js filename=intro
A: {
  while (true) {
    $();
    break A;
  }
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
$();
`````

## Output


`````js filename=intro
$();
`````

## PST Output

With rename=true

`````js filename=intro
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
