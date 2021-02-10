# Preval test case

# if_else.md

> normalize > blocks > if_else
>
> Add blocks to sub-statements

## Input

`````js filename=intro
if ($(1)) $(2);
else $(3);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
