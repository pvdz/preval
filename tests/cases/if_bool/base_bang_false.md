# Preval test case

# base_bang_false.md

> If bool > Base bang false
>
> When the if-test is the arg to Boolean or bang then the value can be predicted

#TODO

## Input

`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(!(x)); // $(true)!
}
`````

## Pre Normal

`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(!x);
}
`````

## Normalized

`````js filename=intro
const x = $(1);
if (x) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = !x;
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output

`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(true);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
