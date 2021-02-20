# Preval test case

# for_in.md

> Normalize > Blocks > For in
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
const tmpForInRhs = $(1);
for (x in tmpForInRhs) {
  $(2);
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
