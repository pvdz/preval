# Preval test case

# for_of.md

> Normalize > Blocks > For of
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x of $(1)) $(2);
`````

## Pre Normal


`````js filename=intro
for (x of $(1)) $(2);
`````

## Normalized


`````js filename=intro
const tmpForOfRhs = $(1);
for (x of tmpForOfRhs) {
  $(2);
}
`````

## Output


`````js filename=intro
const tmpForOfRhs = $(1);
for (x of tmpForOfRhs) {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
for (x of a) {
  $( 2 );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
