# Preval test case

# base_excl.md

> Bool redundancy > Base excl
>
> Bool coercions that are only used in bool contexts can be dropped because they cannot be observed

## Input

`````js filename=intro
const x = !($);
$(!x);
if ($(0)) {
  $('fail');
} else {
  $(Boolean(x));
}
`````

## Pre Normal


`````js filename=intro
const x = !$;
$(!x);
if ($(0)) {
  $(`fail`);
} else {
  $(Boolean(x));
}
`````

## Normalized


`````js filename=intro
const x = !$;
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
const tmpCalleeParam = Boolean($);
$(tmpCalleeParam);
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  const x = !$;
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = Boolean( $ );
$( a );
const b = $( 0 );
if (b) {
  $( "fail" );
}
else {
  const c = !$;
  $( c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 0
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
