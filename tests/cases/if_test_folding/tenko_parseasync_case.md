# Preval test case

# tenko_parseasync_case.md

> If test folding > Tenko parseasync case
>
> Think we already do this

## Input

`````js filename=intro
const tmpIfTest$3265 = fromStmtOrExpr$1 === 1;
if (tmpIfTest$3265) {
  tmpCalleeParam$1359 = false;
} else {
  tmpCalleeParam$1359 = true;
}
`````

## Pre Normal


`````js filename=intro
const tmpIfTest$3265 = fromStmtOrExpr$1 === 1;
if (tmpIfTest$3265) {
  tmpCalleeParam$1359 = false;
} else {
  tmpCalleeParam$1359 = true;
}
`````

## Normalized


`````js filename=intro
const tmpIfTest$3265 = fromStmtOrExpr$1 === 1;
if (tmpIfTest$3265) {
  tmpCalleeParam$1359 = false;
} else {
  tmpCalleeParam$1359 = true;
}
`````

## Output


`````js filename=intro
const tmpIfTest$3265 /*:boolean*/ = fromStmtOrExpr$1 !== 1;
tmpCalleeParam$1359 = tmpIfTest$3265;
`````

## PST Output

With rename=true

`````js filename=intro
const a = fromStmtOrExpr$1 !== 1;
tmpCalleeParam$1359 = a;
`````

## Globals

BAD@! Found 2 implicit global bindings:

fromStmtOrExpr$1, tmpCalleeParam$1359

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
