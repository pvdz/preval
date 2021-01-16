# Preval test case

# while.md

> normalize > blocks > while
>
> Add blocks to sub-statements

#TODO

## Input

`````js filename=intro
while ($(1)) $(2);
`````

## Normalized

`````js filename=intro
while (true) {
  {
    let ifTestTmp = $(1);
    if (ifTestTmp) {
      break;
    } else {
      $(2);
    }
  }
}
`````

## Output

`````js filename=intro
while (true) {
  let ifTestTmp = $(1);
  if (ifTestTmp) {
    break;
  } else {
    $(2);
  }
}
`````
