# Preval test case

# for_regular.md

> normalize > blocks > for_regular
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for ($(1); $(2); $(3)) $(4);
`````

## Normalized

`````js filename=intro
{
  $(1);
  while (true) {
    {
      let ifTestTmp = $(2);
      if (ifTestTmp) {
        $(4);
        $(3);
      } else {
        break;
      }
    }
  }
}
`````

## Output

`````js filename=intro
$(1);
while (true) {
  let ifTestTmp = $(2);
  if (ifTestTmp) {
    $(4);
    $(3);
  } else {
    break;
  }
}
`````
