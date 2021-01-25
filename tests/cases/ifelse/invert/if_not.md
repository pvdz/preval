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
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(2);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(2);
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
