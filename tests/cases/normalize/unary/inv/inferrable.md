# Preval test case

# inferrable.md

> Normalize > Unary > Inv > Inferrable
>
> In this case we could infer the value of the variable because it is inverted after having seen it checked.

#TODO

## Input

`````js filename=intro
const x = $(true);
if (x) {
  // This should print false and we should be able to infer that and eliminate all the things
  $(!x);
}
`````

## Pre Normal


`````js filename=intro
const x = $(true);
if (x) {
  $(!x);
}
`````

## Normalized


`````js filename=intro
const x = $(true);
if (x) {
  const tmpCallCallee = $;
  const tmpCalleeParam = !x;
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output


`````js filename=intro
const x = $(true);
if (x) {
  $(false);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
