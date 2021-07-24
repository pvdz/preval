# Preval test case

# base_boolean.md

> Bool redundancy > Base boolean
>
> Bool coercions that are only used in bool contexts can be dropped because they cannot be observed

#TODO

## Input

`````js filename=intro
const x = Boolean($);
$(!x);
if ($(0)) {
  $('fail');
} else {
  $(Boolean(x));
}
`````

## Pre Normal

`````js filename=intro
const x = Boolean($);
$(!x);
if ($(0)) {
  $(`fail`);
} else {
  $(Boolean(x));
}
`````

## Normalized

`````js filename=intro
const x = Boolean($);
const tmpCallCallee = $;
const tmpCalleeParam = !x;
tmpCallCallee(tmpCalleeParam);
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = Boolean(x);
  tmpCallCallee$1(tmpCalleeParam$1);
}
`````

## Output

`````js filename=intro
const x = Boolean($);
const tmpCalleeParam = !x;
$(tmpCalleeParam);
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  $(x);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 0
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
