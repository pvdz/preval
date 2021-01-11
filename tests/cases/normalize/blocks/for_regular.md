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
        break;
      } else {
        $(4);
        $(3);
      }
    }
  }
}
`````

## Uniformed

`````js filename=intro
{
  x(8);
  while (x) {
    {
      var x = x(8);
      if (x) {
        break;
      } else {
        x(8);
        x(8);
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
    break;
  } else {
    $(4);
    $(3);
  }
}
`````
