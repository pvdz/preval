# Preval test case

# empty_body.md

> normalize > while > empty_body
>
> A loop cannot be eliminated but can be normalized

#TODO

## Input

`````js filename=intro
while ($());
`````

## Normalized

`````js filename=intro
while (true) {
  {
    let ifTestTmp = $();
    if (ifTestTmp) {
    } else {
      break;
    }
  }
}
`````

## Output

`````js filename=intro
while (true) {
  let ifTestTmp = $();
  if (ifTestTmp) {
  } else {
    break;
  }
}
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
