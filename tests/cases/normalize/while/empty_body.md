# Preval test case

# empty_body.md

> Normalize > While > Empty body
>
> A loop cannot be eliminated but can be normalized

#TODO

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
let tmpIfTest = $();
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $();
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  let tmpClusterSSA_tmpIfTest = $();
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      tmpClusterSSA_tmpIfTest = $();
    } else {
      break;
    }
  }
} else {
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
