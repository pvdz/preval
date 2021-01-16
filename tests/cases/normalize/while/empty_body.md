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
    break;
  }
}
`````
