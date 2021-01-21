# Preval test case

# end.md

> normalize > sequence > end
>
> Making sure that breaking up sequences doesn't run into sub-statement trouble here.

## Input

`````js filename=intro
if ($(0)) ($(1), $(2), $(3), $(4), ($(5), $(6)));
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = $(0);
  if (ifTestTmp) {
    $(1);
    $(2);
    $(3);
    $(4);
    $(5);
    $(6);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = $(0);
if (ifTestTmp) {
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
}
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
