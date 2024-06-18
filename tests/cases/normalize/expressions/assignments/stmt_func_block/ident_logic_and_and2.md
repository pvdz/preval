# Preval test case

# ident_logic_and_and2.md

> Normalize > Expressions > Assignments > Stmt func block > Ident logic and and2
>
> Normalization of assignments should work the same everywhere they are

Confirming that SSA is applied when there's no prior closure.

## Input

`````js filename=intro
let theneedle = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
theneedle = $(tmpCalleeParam);
const tmpBranchingC$1 = function () {
  $(theneedle);
  return undefined;
};
const tmpBranchingC = function () {
  if (theneedle) {
    const tmpCalleeParam$7 = $(2);
    theneedle = $(tmpCalleeParam$7);
    tmpBranchingC$1();
    return undefined;
  } else {
    tmpBranchingC$1();
    return undefined;
  }
};
if (theneedle) {
  const tmpCalleeParam$3 = $(1);
  theneedle = $(tmpCalleeParam$3);
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
`````

## Pre Normal


`````js filename=intro
let theneedle = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
theneedle = $(tmpCalleeParam);
const tmpBranchingC$1 = function () {
  debugger;
  $(theneedle);
  return undefined;
};
const tmpBranchingC = function () {
  debugger;
  if (theneedle) {
    const tmpCalleeParam$7 = $(2);
    theneedle = $(tmpCalleeParam$7);
    tmpBranchingC$1();
    return undefined;
  } else {
    tmpBranchingC$1();
    return undefined;
  }
};
if (theneedle) {
  const tmpCalleeParam$3 = $(1);
  theneedle = $(tmpCalleeParam$3);
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
`````

## Normalized


`````js filename=intro
let theneedle = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
theneedle = $(tmpCalleeParam);
const tmpBranchingC$1 = function () {
  debugger;
  $(theneedle);
  return undefined;
};
const tmpBranchingC = function () {
  debugger;
  if (theneedle) {
    const tmpCalleeParam$7 = $(2);
    theneedle = $(tmpCalleeParam$7);
    tmpBranchingC$1();
    return undefined;
  } else {
    tmpBranchingC$1();
    return undefined;
  }
};
if (theneedle) {
  const tmpCalleeParam$3 = $(1);
  theneedle = $(tmpCalleeParam$3);
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const theneedle = $(tmpCalleeParam);
if (theneedle) {
  const tmpCalleeParam$3 = $(1);
  const tmpClusterSSA_theneedle = $(tmpCalleeParam$3);
  if (tmpClusterSSA_theneedle) {
    const tmpCalleeParam$7 = $(2);
    const tmpClusterSSA_theneedle$1 = $(tmpCalleeParam$7);
    $(tmpClusterSSA_theneedle$1);
  } else {
    $(tmpClusterSSA_theneedle);
  }
} else {
  $(theneedle);
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( f );
  }
  else {
    $( d );
  }
}
else {
  $( b );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
