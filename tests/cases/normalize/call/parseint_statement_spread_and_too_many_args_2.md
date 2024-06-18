# Preval test case

# parseint_statement_spread_and_too_many_args_2.md

> Normalize > Call > Parseint statement spread and too many args 2
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
parseInt(...$([1, 2]), $spy('b'), $spy('c'));
`````

## Pre Normal


`````js filename=intro
parseInt(...$([1, 2]), $spy(`b`), $spy(`c`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
const tmpArrSpread = tmpCallCallee(tmpCalleeParam);
const tmpArgOverflowOne = [...tmpArrSpread];
const tmpArgOverflowLen = tmpArgOverflowOne.length;
const tmpArgOverflowTwo = $spy(`b`);
const tmpArgOverflowThree = $spy(`c`);
let tmpCallCallee$1 = undefined;
if (tmpArgOverflowLen) {
  tmpCallCallee$1 = tmpArgOverflowOne[0];
} else {
  tmpCallCallee$1 = tmpArgOverflowTwo;
}
$coerce(tmpCallCallee$1, `string`);
let tmpUnaryArg = undefined;
const tmpIfTest = tmpArgOverflowLen > 1;
if (tmpIfTest) {
  tmpUnaryArg = tmpArgOverflowOne[1];
} else {
  if (tmpArgOverflowLen) {
    tmpUnaryArg = tmpArgOverflowTwo;
  } else {
    tmpUnaryArg = tmpArgOverflowThree;
  }
}
+tmpUnaryArg;
`````

## Output


`````js filename=intro
const tmpCalleeParam = [1, 2];
const tmpArrSpread = $(tmpCalleeParam);
const tmpArgOverflowOne = [...tmpArrSpread];
const tmpArgOverflowLen = tmpArgOverflowOne.length;
const tmpArgOverflowTwo = $spy(`b`);
const tmpArgOverflowThree = $spy(`c`);
if (tmpArgOverflowLen) {
  const tmpClusterSSA_tmpCallCallee$1 = tmpArgOverflowOne[0];
  $coerce(tmpClusterSSA_tmpCallCallee$1, `string`);
} else {
  $coerce(tmpArgOverflowTwo, `string`);
}
let tmpUnaryArg = undefined;
const tmpIfTest = tmpArgOverflowLen > 1;
if (tmpIfTest) {
  tmpUnaryArg = tmpArgOverflowOne[1];
} else {
  if (tmpArgOverflowLen) {
    tmpUnaryArg = tmpArgOverflowTwo;
  } else {
    tmpUnaryArg = tmpArgOverflowThree;
  }
}
+tmpUnaryArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $( a );
const c = [ ... b ];
const d = c.length;
const e = $spy( "b" );
const f = $spy( "c" );
if (d) {
  const g = c[ 0 ];
  $coerce( g, "string" );
}
else {
  $coerce( e, "string" );
}
let h = undefined;
const i = d > 1;
if (i) {
  h = c[ 1 ];
}
else {
  if (d) {
    h = e;
  }
  else {
    h = f;
  }
}
+h;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: 'Creating spy', 2, 1, ['c', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
