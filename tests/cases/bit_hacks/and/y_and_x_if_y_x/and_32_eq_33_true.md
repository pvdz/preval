# Preval test case

# and_32_eq_33_true.md

> Bit hacks > And > Y and x if y x > And 32 eq 33 true
>
> The result of an AND as if test tells something about the value in each branch, even if we don't know the full value.

## Input

`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  // If x is true then spy must have the 32nd bit set, whatever the actual value is. So it cannot be 16 in total.
  $('pass', spy === 33);
} else {
  // If x is false then spy must not have the 32nd bit set, whatever it is
  $('fail', spy === 33);
}
`````

## Pre Normal


`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  $(`pass`, spy === 33);
} else {
  $(`fail`, spy === 33);
}
`````

## Normalized


`````js filename=intro
const spy = $spy(33);
const x = spy & 32;
if (x) {
  const tmpCalleeParam = spy === 33;
  $(`pass`, tmpCalleeParam);
} else {
  const tmpCalleeParam$1 = spy === 33;
  $(`fail`, tmpCalleeParam$1);
}
`````

## Output


`````js filename=intro
const spy /*:unknown*/ = $spy(33);
const x /*:number*/ = spy & 32;
if (x) {
  const tmpCalleeParam /*:boolean*/ = spy === 33;
  $(`pass`, tmpCalleeParam);
} else {
  $(`fail`, false);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 33 );
const b = a & 32;
if (b) {
  const c = a === 33;
  $( "pass", c );
}
else {
  $( "fail", false );
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
