# Preval test case

# truthy_base.md

> Fake do while > Truthy base
>
> 

## Input

`````js filename=intro
let test = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $();
    test = false;
  } else {
    break;
  }
}
`````

## Pre Normal


`````js filename=intro
let test = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $();
    test = false;
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
let test = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $();
    test = false;
  } else {
    break;
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
