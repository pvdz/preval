# Preval test case

# inferrable.md

> normalize > unary > inv > inferrable
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

## Normalized

`````js filename=intro
const x = $(true);
if (x) {
  const tmpCallCallee = $;
  const tmpCalleeParam = !x;
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output

`````js filename=intro
const x = $(true);
if (x) {
  const tmpCalleeParam = !x;
  $(tmpCalleeParam);
}
`````

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same