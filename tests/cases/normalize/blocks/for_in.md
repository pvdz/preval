# Preval test case

# for_in.md

> normalize > blocks > for_in
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x in $(1)) $(2);
`````

## Normalized

`````js filename=intro
const tmpForInRhs = $(1);
for (x in tmpForInRhs) {
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
