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
      $(2);
    } else {
      break;
    }
  }
}
`````

## Output

`````js filename=intro
while (true) {
  let ifTestTmp = $(1);
  if (ifTestTmp) {
    $(2);
  } else {
    break;
  }
}
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
