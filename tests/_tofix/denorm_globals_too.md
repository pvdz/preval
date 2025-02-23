# Preval test case

# denorm_globals_too.md

> Tofix > denorm globals too
>
> denormalization should restore preval symbols with JS code where possible. as a bonus: the .name there can be resolved. $frfr can be inlined. $coerce is reverted i think.

## Input

`````js filename=intro
const c$19 = a$41(tmpCalleeParam$285);
const tmpClusterSSA_f$11/*:boolean*/ = $regex_toString.name != `toString`;
let tmpIfTest$209 = c$19;
if (!c$19) {
  tmpIfTest$209 = tmpClusterSSA_f$11;
}
if (tmpIfTest$209) {
  i$71($RegExp_prototype, `toString`, tmpCalleeParam$293, { unsafe: true });
}
`````

## Pre Normal


`````js filename=intro
const c$19 = a$41(tmpCalleeParam$285);
const tmpClusterSSA_f$11 = $regex_toString.name != `toString`;
let tmpIfTest$209 = c$19;
if (!c$19) {
  tmpIfTest$209 = tmpClusterSSA_f$11;
}
if (tmpIfTest$209) {
  i$71($RegExp_prototype, `toString`, tmpCalleeParam$293, { unsafe: true });
}
`````

## Normalized


`````js filename=intro
const c$19 = a$41(tmpCalleeParam$285);
const tmpBinLhs = `toString`;
const tmpClusterSSA_f$11 = tmpBinLhs != `toString`;
let tmpIfTest$209 = c$19;
if (c$19) {
} else {
  tmpIfTest$209 = tmpClusterSSA_f$11;
}
if (tmpIfTest$209) {
  const tmpCallCallee = i$71;
  const tmpCalleeParam = $RegExp_prototype;
  const tmpCalleeParam$1 = `toString`;
  const tmpCalleeParam$3 = tmpCalleeParam$293;
  const tmpCalleeParam$5 = { unsafe: true };
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
} else {
}
`````

## Output


`````js filename=intro
const c$19 = a$41(tmpCalleeParam$285);
if (c$19) {
  const tmpCallCallee = i$71;
  const tmpCalleeParam$3 = tmpCalleeParam$293;
  const tmpCalleeParam$5 /*:object*/ = { unsafe: true };
  tmpCallCallee($RegExp_prototype, `toString`, tmpCalleeParam$3, tmpCalleeParam$5);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = a$41( tmpCalleeParam$285 );
if (a) {
  const b = i$71;
  const c = tmpCalleeParam$293;
  const d = { unsafe: true };
  b( $RegExp_prototype, "toString", c, d );
}
`````

## Globals

BAD@! Found 4 implicit global bindings:

a$41, tmpCalleeParam$285, i$71, tmpCalleeParam$293

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
