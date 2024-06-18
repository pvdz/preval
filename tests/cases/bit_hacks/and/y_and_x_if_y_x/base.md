# Preval test case

# base.md

> Bit hacks > And > Y and x if y x > Base
>
> Base case of this pattern

## Input

`````js filename=intro
const spy = $spy();
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('fail', spy === 16);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
  $('pass', spy === 16);
}
`````

## Pre Normal


`````js filename=intro
const spy = $spy();
const x = spy & 32;
if (x) {
  $(`fail`, spy === 16);
} else {
  $(`pass`, spy === 16);
}
`````

## Normalized


`````js filename=intro
const spy = $spy();
const x = spy & 32;
if (x) {
  const tmpCallCallee = $;
  const tmpCalleeParam = `fail`;
  const tmpCalleeParam$1 = spy === 16;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = `pass`;
  const tmpCalleeParam$5 = spy === 16;
  tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
}
`````

## Output


`````js filename=intro
const spy = $spy();
const x = spy & 32;
if (x) {
  $(`fail`, false);
} else {
  const tmpCalleeParam$5 = spy === 16;
  $(`pass`, tmpCalleeParam$5);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = a & 32;
if (b) {
  $( "fail", false );
}
else {
  const c = a === 16;
  $( "pass", c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 'fail', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
