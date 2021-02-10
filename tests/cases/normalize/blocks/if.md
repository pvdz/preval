# Preval test case

# if.md

> normalize > blocks > if
>
> Add blocks to sub-statements

## Input

`````js filename=intro
if ($(1)) $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
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
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
