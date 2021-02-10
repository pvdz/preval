# Preval test case

# else_not.md

> ifelse > invert > else_not
>
> Invert the logic

## Input

`````js filename=intro
if (!$(1)) $(2);
else $(3);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(3);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
