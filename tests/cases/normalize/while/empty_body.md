# Preval test case

# empty_body.md

> Normalize > While > Empty body
>
> A loop cannot be eliminated but can be normalized

## Input

`````js filename=intro
while ($());
`````

## Pre Normal


`````js filename=intro
while ($());
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $();
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $();
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  while ($LOOP_UNROLL_10) {
    const b = $();
    if (b) {

    }
    else {
      break;
    }
  }
}
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
