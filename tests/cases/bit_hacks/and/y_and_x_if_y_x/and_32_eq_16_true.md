# Preval test case

# and_32_eq_16_true.md

> Bit hacks > And > Y and x if y x > And 32 eq 16 true
>
> The result of an AND as if test tells something about the value in each branch, even if we don't know the full value.

#TODO

## Input

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('pass', spy === 16);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
  $('fail', spy === 16);
}
`````

## Pre Normal

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  $(`pass`, spy === 16);
} else {
  $(`fail`, spy === 16);
}
`````

## Normalized

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  const tmpCallCallee = $;
  const tmpCalleeParam = `pass`;
  const tmpCalleeParam$1 = spy === 16;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = `fail`;
  const tmpCalleeParam$5 = spy === 16;
  tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
}
`````

## Output

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  $(`pass`, false);
} else {
  const tmpCalleeParam$5 = spy === 16;
  $(`fail`, tmpCalleeParam$5);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [33, 33]
 - 2: '$spy[1].valueOf()', 33
 - 3: 'pass', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
