# Preval test case

# return_sequence.md

> normalize > sequence > return_sequence
>
> Conditional sequence

#TODO

## Input

`````js filename=intro
if (($(1), $(2))) $(3);
`````

## Normalized

`````js filename=intro
$(1);
{
  let ifTestTmp = $(2);
  if (ifTestTmp) {
    $(3);
  }
}
`````

## Output

`````js filename=intro
$(1);
let ifTestTmp = $(2);
if (ifTestTmp) {
  $(3);
}
`````

## Result

Should call `$` with:
[[1], [2], null];

Normalized calls: Same

Final output calls: Same
