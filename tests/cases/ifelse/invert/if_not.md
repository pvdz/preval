# Preval test case

# if_not.md

> ifelse > invert > if_not
>
> Invert the logic

## Input

`````js filename=intro
if (!$(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = $(1);
  if (ifTestTmp) {
  } else {
    $(2);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = $(1);
if (ifTestTmp) {
} else {
  $(2);
}
`````

## Result

Should call `$` with:
[[1], [2], null];

Normalized calls: Same

Final output calls: Same
