# Preval test case

# and_32_neq_33_true.md

> Bit hacks > And > Y and x if y x > And 32 neq 33 true
>
> The result of an AND as if test tells something about the value in each branch, even if we don't know the full value.

## Input

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('fail', spy !== 33);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
  $('pass', spy !== 33);
}
`````

## Pre Normal


`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  $(`fail`, spy !== 33);
} else {
  $(`pass`, spy !== 33);
}
`````

## Normalized


`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  const tmpCallCallee = $;
  const tmpCalleeParam = `fail`;
  const tmpCalleeParam$1 = spy !== 33;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = `pass`;
  const tmpCalleeParam$5 = spy !== 33;
  tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
}
`````

## Output


`````js filename=intro
const spy /*:unknown*/ = $spy(33);
const x /*:number*/ = spy & 32;
if (x) {
  const tmpCalleeParam$1 /*:boolean*/ = spy !== 33;
  $(`fail`, tmpCalleeParam$1);
} else {
  $(`pass`, true);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 33 );
const b = a & 32;
if (b) {
  const c = a !== 33;
  $( "fail", c );
}
else {
  $( "pass", true );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [33, 33]
 - 2: '$spy[1].valueOf()', 33
 - 3: 'fail', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
