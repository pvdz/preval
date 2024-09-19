# Preval test case

# falsy_number.md

> Excl > Falsy number
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
const x = (1*$(1));
if (x) {
  $(!x);
} else {
  // Here x is falsy, whatever it is, so !x must be true.
  $(!x);
}
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(1);
if (x) {
  $(!x);
} else {
  $(!x);
}
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs * tmpBinBothRhs;
if (x) {
  const tmpCallCallee = $;
  const tmpCalleeParam = !x;
  tmpCallCallee(tmpCalleeParam);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = !x;
  tmpCallCallee$1(tmpCalleeParam$1);
}
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpBool /*:boolean*/ = !x;
$(tmpBool);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = !b;
$( c );
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
