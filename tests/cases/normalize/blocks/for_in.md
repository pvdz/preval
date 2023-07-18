# Preval test case

# for_in.md

> Normalize > Blocks > For in
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x in $(1)) $(2);
`````

## Pre Normal

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

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
for (x in a {
  $( 2 );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
