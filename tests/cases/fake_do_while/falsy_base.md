# Preval test case

# falsy_base.md

> Fake do while > Falsy base
>
> 

#TODO

## Input

`````js filename=intro
let test = false;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    break;
  } else {
    $();
    test = true;
  }
}
`````

## Pre Normal


`````js filename=intro
let test = false;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    break;
  } else {
    $();
    test = true;
  }
}
`````

## Normalized


`````js filename=intro
let test = false;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    break;
  } else {
    $();
    test = true;
  }
}
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
