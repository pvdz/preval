# Preval test case

# base_bang_true.md

> If bool > Base bang true
>
> When the if-test is the arg to Boolean or bang then the value can be predicted

#TODO

## Input

`````js filename=intro
const x = $(1);
if (x) {
  $(!(x)); // $(true)!
}
`````

## Pre Normal

`````js filename=intro
const x = $(1);
if (x) {
  $(!x);
}
`````

## Normalized

`````js filename=intro
const x = $(1);
if (x) {
  const tmpCallCallee = $;
  const tmpCalleeParam = !x;
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
const x = $(1);
if (x) {
  $(false);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( false );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
