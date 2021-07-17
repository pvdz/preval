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
while (tmpIfTest) {
  tmpIfTest = $();
}
`````

## Output

`````js filename=intro
let tmpIfTest = $();
while (tmpIfTest) {
  tmpIfTest = $();
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
